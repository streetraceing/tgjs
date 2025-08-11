import axios from "axios"

import { Logger, LogLevels } from "@/lib/logger"
import { DirectBotConstructorError, IncorrectBotOptions, RequestError } from "@/lib/errors"
import { isInputFile, joinUrl, deepMerge as merge, toFormData } from "@/lib/util"
import { ClientOptions } from "@/types/client"
import { apiUrl, defaultBotOptions, tokenMinimalLength } from "@/lib/constants"
import { ReturnOf, SmartArgs } from "@/types/util"
import { TelegramEventMap } from "@/types/telegram/events"
import { UpdateEventMap } from "@/types/telegram/events"
import { TelegramMethodMap } from "@/types/telegram/methods"
import { Update } from "@/types/telegram"
import { Longpoll, Updates, Webhook } from "@/api/updates"
import { EventEmitter } from "node:stream"

const internal = Symbol('internal')

export class Client {
    private botApiUrl: string
    private options: ClientOptions
    private events: EventEmitter

    logger: Logger
    updates!: Updates

    public static async create(options: ClientOptions): Promise<Client> {
        const bot = new Client(options, internal)

        await bot.init()

        return bot
    }

    private constructor(options: ClientOptions, key: symbol) {
        if (key !== internal) {
            throw new DirectBotConstructorError()
        }

        this.options = merge<ClientOptions>(defaultBotOptions, options)

        if (this.options.token == "" || this.options.token.length < tokenMinimalLength || !this.options.token) {
            throw new IncorrectBotOptions("token", this.options.token, `Token minimal length is ${tokenMinimalLength}`)
        }

        if (!this.options.logger?.level || !LogLevels.includes(this.options.logger?.level)) {
            throw new IncorrectBotOptions("logger.level", this.options.logger?.level, `Logger level must be one of [${LogLevels.join(', ')}]`)
        }

        if (this.options.updates?.method == "webhook" && !this.options.updates.webhook.domain) {
            throw new IncorrectBotOptions("updates.webhook.domain", this.options.updates.webhook.domain, `Webhook server needs domain e.g. https://*-*-*-*.trycloudflare.com or any other`)
        }

        this.botApiUrl = joinUrl(apiUrl, `/bot${this.options.token}/`)
        this.logger = new Logger(this.options.logger!)
        this.events = new EventEmitter()
    }

    private async init(): Promise<void> {
        const me = await this.request("getMe", {
            config: {}
        })
        this.logger.debug({ text: `Username: ${me.username} | Id: ${me.id}`, module: "bot" })

        switch (this.options.updates?.method) {
            case "longpoll":
                this.logger.debug({ text: `Use longpolling | Timeout: ${this.options.updates.longpoll!.timeout}s`, module: "bot" })

                this.updates = new Longpoll(this, this.handleUpdate, this.options.updates.longpoll!)

                break
            case "webhook":
                this.logger.debug({
                    text: `Use webhook server | Host: http://localhost:${this.options.updates.webhook!.port} | URL: ${joinUrl(this.options.updates.webhook!.domain, this.options.updates.webhook!.path!)}`,
                    module: "bot"
                })

                this.updates = new Webhook(this, this.handleUpdate, this.options.updates.webhook!)

                break
        }

        if (this.options.updates!.autostart) {
            this.updates.start()
        }
    }

    private handleUpdate = async (update: Update) => {
        const { update_id } = update
        
        this.logger.debug({ text: `<gray>${JSON.stringify(update)}</gray>`, module: "updates" })

        for (const event in UpdateEventMap) {
            const payload = UpdateEventMap[event as keyof TelegramEventMap](update)

            if (payload) {
                this.events.emit(event, { update_id, ...payload })
            }
        }
    }

    on<E extends keyof TelegramEventMap>(
        event: E,
        listener: (object: TelegramEventMap[E] & { update_id: number }) => void
    ) {
        this.events.on(event, listener)
    }

    request<M extends keyof TelegramMethodMap>(
        method: M,
        ...args: SmartArgs<M>
    ): Promise<ReturnOf<TelegramMethodMap[M]>>

    async request(method: any, ...args: any[]): Promise<any> {
        let input = args[0] ?? {},
            url = joinUrl(this.botApiUrl, method),
            res

        let payload = { ...input, config: undefined }

        this.logger.debug({
            text: `<yellow>POST</yellow> ${url} <gray>${JSON.stringify(payload)}</gray>`,
            module: "bot"
        })

        if (Object.values(payload).some(isInputFile)) {
            const form = toFormData(payload)
            res = await axios.post(url, form, {
                ...input.config,
                headers: form.getHeaders(),
                validateStatus: () => true
            })
        } else {
            res = await axios.post(url, payload, {
                ...input.config,
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true
            })
        }

        const data = res.data

        if (!data.ok) {
            throw new RequestError(Logger.secureTokens(url), data.error_code, data.description)
        }

        return data.result
    }
}
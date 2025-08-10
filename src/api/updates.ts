import axios from "axios"

import { Client } from "@/api/client"
import { Update } from "@/types/telegram"
import { RequestError } from "@/lib/errors"
import { LongpollOptions, WebhookOptions } from "@/types/client"
import { createServer, IncomingMessage, ServerResponse } from "http"
import { joinUrl } from "@/lib/util"

export abstract class Updates {
    constructor(
        protected bot: Client,
        protected handleUpdate: (update: Update) => Promise<void> | void
    ) { }

    abstract start(): Promise<void>
    abstract stop(): void

    protected async cleanWebhook() {
        const webhook_info = await this.bot.request('getWebhookInfo')

        if (webhook_info.url !== "") {
            await this.bot.request('deleteWebhook')
        }
    }
}

export class Longpoll extends Updates {
    private offset = 0
    private running = false
    private controller: AbortController | null = null

    constructor(
        bot: Client,
        handleUpdate: (update: Update) => Promise<void> | void,
        private options: LongpollOptions
    ) {
        super(bot, handleUpdate)
    }

    async start() {
        if (this.running) return
        this.running = true

        await this.cleanWebhook()

        this.bot.logger.info({ text: "Longpolling started", module: "updates" })

        while (this.running) {
            this.controller = new AbortController()

            let updates = []

            try {
                updates = await this.bot.request("getUpdates", {
                    offset: this.offset,
                    timeout: this.options.timeout
                })
            } catch (err) {
                if (axios.isCancel(err) || (err as Error).name === "AbortError") {
                    this.bot.logger.debug({ text: "Longpolling aborted", module: "updates" })
                    break
                } else throw err
            }

            for (const update of updates) {
                this.offset = update.update_id + 1
                await this.handleUpdate(update)
            }
        }

        this.bot.logger.debug({ text: "Longpolling stopped", module: "updates" })
    }

    stop() {
        if (this.running) {
            this.running = false
            this.controller?.abort()
        }
    }
}

export class Webhook extends Updates {
    private running = false
    private server: ReturnType<typeof createServer> | null = null

    constructor(
        bot: Client,
        handleUpdate: (update: Update) => Promise<void> | void,
        private options: WebhookOptions
    ) {
        super(bot, handleUpdate)
    }

    async start() {
        if (this.running) return
        this.running = true

        await this.cleanWebhook()

        const url = joinUrl(this.options.domain, this.options.path!)

        await this.bot.request("setWebhook", {
            url,
            ...{
                ...this.options,
                port: undefined,
                path: undefined,
                domain: undefined
            }
        })

        this.server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
            if (req.method !== "POST" || req.url !== this.options.path) {
                res.statusCode = 404
                return res.end("Not Found")
            }

            try {
                const chunks: Uint8Array[] = []
                for await (const chunk of req) chunks.push(chunk)
                const body = Buffer.concat(chunks).toString()
                const data: Update = JSON.parse(body)

                await this.handleUpdate(data)
                res.writeHead(200)
                res.end("ok")
            } catch (err) {
                res.writeHead(500)
                res.end("error")
                throw err
            }
        })

        this.server.listen(this.options.port, () => {
            this.bot.logger.info({ text: `Webhook server listening on port ${this.options.port} to ${url}`, module: "updates" })
        })
    }

    public stop() {
        if (this.server) {
            this.server.close(() => {
                this.bot.logger.info({ text: "Webhook server stopped", module: "updates" })
            })
            this.server = null
        }
    }
}
import { ArgsOf, RequiredKeys } from "@/types/util"
import { TelegramMethodMap } from "@/types/telegram/methods"
import { LoggerParams } from "@/lib/logger"

export type BotUpdatesMethod = "longpoll" | "webhook"

export type LongpollOptions = ArgsOf<TelegramMethodMap["getUpdates"]>

export type WebhookOptions = Omit<ArgsOf<TelegramMethodMap["setWebhook"]>, "url"> & {
    domain: string
    port?: number
    path?: string
}

export type LongpollPart<T> = RequiredKeys<T> extends never
    ? { longpoll?: T; webhook?: never }
    : { longpoll: T; webhook?: never }

export type WebhookPart<T> = RequiredKeys<T> extends never
    ? { webhook?: T; longpoll?: never }
    : { webhook: T; longpoll?: never }

export type ClientUpdates<TLongpoll, TWebhook> =
    | (LongpollPart<TLongpoll> & {
        method?: "longpoll"
        autostart?: boolean
    })
    | (WebhookPart<TWebhook> & {
        method: "webhook"
        autostart?: boolean
    })

export type ClientOptions = {
    token: string
    logger?: LoggerParams
    updates?: ClientUpdates<LongpollOptions, WebhookOptions>
}
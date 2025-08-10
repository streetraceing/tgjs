import { Client } from "@/api/client"
import { ClientOptions } from "@/types/client"
import { TelegramEventMap } from "@/types/telegram/events"
import { TelegramMethodMap } from "@/types/telegram/methods"
import { ReturnOf, SmartArgs } from "@/types/util"

export class Bot {
    private client!: Client
    private initPromise: Promise<void>

    constructor(private options: ClientOptions) {
        this.initPromise = this.init()
    }

    private async init() {
        this.client = await Client.create(this.options)
    }

    private async ready() {
        await this.initPromise
    }

    async request<M extends keyof TelegramMethodMap>(
        method: M,
        ...args: SmartArgs<M>
    ): Promise<ReturnOf<TelegramMethodMap[M]>> {
        await this.ready()
        return this.client.request(method, ...args)
    }

    on<E extends keyof TelegramEventMap>(
        event: E,
        listener: (object: TelegramEventMap[E] & { update_id: number }) => void
    ) {
        this.ready().then(() => {
            this.client.on(event, listener)
        })
    }
}
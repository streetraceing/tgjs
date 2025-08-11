import { Client } from "@/api/client"
import { ClientOptions } from "@/types/client"
import { TelegramEventMap } from "@/types/telegram/events"
import { TelegramMethodMap } from "@/types/telegram/methods"
import { ReturnOf, SmartArgsWithoutConfig } from "@/types/util"
import { ContextClassMap } from "@/types/telegram/context"

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

    /** Sending requests via the Telegram API */
    async request<M extends keyof TelegramMethodMap>(
        method: M,
        ...args: SmartArgsWithoutConfig<M>
    ): Promise<ReturnOf<TelegramMethodMap[M]>> {
        await this.ready()
        return this.client.request(method, ...args)
    }

    /** Registration for the event */
    on<E extends keyof TelegramEventMap>(
        event: E,
        listener: (
            object: E extends keyof typeof ContextClassMap
                ? InstanceType<typeof ContextClassMap[E]>
                : TelegramEventMap[E] & { update_id: number }
        ) => void
    ) {
        this.ready().then(() => {
            this.client.on<E>(event, (raw: TelegramEventMap[E] & { update_id: number }) => {
                let result: any = raw;

                if (event in ContextClassMap) {
                    const CtxClass = ContextClassMap[event as keyof typeof ContextClassMap];
                    result = new (CtxClass as any)(raw, raw.update_id, this.client);
                }

                listener(result);
            });
        });
    }
}
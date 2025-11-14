import { EventEmitter } from 'node:stream';
import { Client } from '@/api/client';
import { ClientOptions } from '@/types/client';
import { ContextClassMap } from '@/types/context';
import {
    BotEventMap,
    TELEGRAM_EVENT_SET,
    TelegramEventMap,
} from '@/types/events';
import { TelegramMethodMap } from '@/types/methods';
import { ReturnOf, SmartArgsWithoutConfig } from '@/types/util';

export class Bot {
    #events = new EventEmitter();
    #initPromise: Promise<void>;
    #client!: Client;
    #options: ClientOptions;

    constructor(options: ClientOptions) {
        this.#options = options;
        this.#initPromise = this.init();
    }

    private async init() {
        this.#client = await Client.create(this.#options);
        this.setupEvents();
    }

    private async ready() {
        await this.#initPromise;
    }

    private setupEvents() {
        // Commands like /start (ctx.first.name)
        this.#client.on('message', (msg) => {
            const text = msg.text;
            const entities = msg.entities;

            if (!text || !entities) return;

            const botCommands = entities
                .filter((e) => e.type === 'bot_command')
                .sort((a, b) => a.offset - b.offset);

            if (!botCommands.length) return;

            const commands: { name: string; args: string[] }[] = [];

            for (let i = 0; i < botCommands.length; i++) {
                const entity = botCommands[i];
                const nextEntity = botCommands[i + 1];

                const name = text
                    .slice(entity.offset + 1, entity.offset + entity.length)
                    .replace(/^[^a-zA-Z0-9]+/, '')
                    .replace(/@.+$/, '');

                const argsText = text
                    .slice(
                        entity.offset + entity.length,
                        nextEntity ? nextEntity.offset : undefined,
                    )
                    .trim();

                const args = argsText.length ? argsText.split(/\s+/) : [];

                commands.push({ name, args });
            }

            if (commands.length) {
                this.#events.emit('command', { message: msg, commands });
            }
        });

        // Callback Query with groups like callback_query:settings
        this.#client.on('callback_query', (ctx) => {
            const data = ctx.data;
            if (!data) return;

            const [groupId, action] = data.split(':');

            if (action) {
                this.#events.emit(`callback_query:${groupId}`, { ctx, action });
            } else {
                this.#events.emit('callback_query', ctx);
            }
        });
    }

    async request<M extends keyof TelegramMethodMap>(
        method: M,
        ...args: SmartArgsWithoutConfig<M>
    ): Promise<ReturnOf<TelegramMethodMap[M]>> {
        await this.ready();
        return await this.#client.request(method, ...args);
    }

    on<E extends keyof BotEventMap>(
        event: E,
        listener: (
            object: E extends keyof typeof ContextClassMap
                ? InstanceType<(typeof ContextClassMap)[E]>
                : BotEventMap[E] & { update_id: number },
        ) => void,
    ) {
        this.ready().then(() => {
            const handler = (raw: any) => {
                let result: any = raw;

                if (event in ContextClassMap) {
                    const CtxClass =
                        ContextClassMap[event as keyof typeof ContextClassMap];
                    result = new (CtxClass as any)(raw, this);
                }

                listener(result);
            };

            if (TELEGRAM_EVENT_SET.has(event)) {
                this.#client.on(event as keyof TelegramEventMap, handler);
            } else {
                this.#events.on(event as string, handler);
            }
        });
    }
}

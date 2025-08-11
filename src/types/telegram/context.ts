import { AllowedReaction, CallbackQuery, Message } from "@/types/telegram"
import { Client } from "@/api/client";
import { TelegramEventMap } from "@/types/telegram/events";

export interface BaseContext<Raw> {
    raw: Raw;
    update_id: number;
}

export class MessageContext implements BaseContext<Message> {
    constructor(
        public raw: Message,
        public update_id: number,
        private bot: Client
    ) { }

    /** Send a reply to this message */
    async reply(text: string) {
        return this.bot.request("sendMessage", {
            chat_id: this.raw.chat.id,
            text,
            reply_parameters: {
                message_id: this.raw.message_id
            }
        });
    }

    /** Delete a message */
    async delete() {
        return this.bot.request("deleteMessage", {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id
        });
    }

    /** React with emoji */
    async react(emoji: AllowedReaction) {
        return this.bot.request("setMessageReaction", {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
            reaction: [{ type: "emoji", emoji }]
        });
    }
}

export class CallbackQueryContext implements BaseContext<CallbackQuery> {
    constructor(
        public raw: CallbackQuery,
        public update_id: number,
        private bot: Client
    ) { }

    /** Respond to a click in the Callback Query */
    async answer(text?: string, show_alert = false) {
        return this.bot.request("answerCallbackQuery", {
            callback_query_id: this.raw.id,
            text,
            show_alert
        });
    }

    /** Reply to the bot message */
    async reply(text: string) {
        if (this.raw.message) {
            return this.bot.request("sendMessage", {
                chat_id: this.raw.message.chat.id,
                text
            });
        }
    }
}

export const ContextClassMap = {
    message: MessageContext,
    callback_query: CallbackQueryContext
} as const;

export const ContextFactory = {
    message: (raw: TelegramEventMap["message"], update_id: number, bot: Client) =>
        new MessageContext(raw, update_id, bot),

    callback_query: (raw: TelegramEventMap["callback_query"], update_id: number, bot: Client) =>
        new CallbackQueryContext(raw, update_id, bot)
};
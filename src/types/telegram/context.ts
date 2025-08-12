import { AllowedReaction, CallbackQuery, ChatJoinRequest, ChatMemberUpdated, InlineQuery, Message, MessageReactionUpdated, Poll, PollAnswer, PreCheckoutQuery, ShippingOption, ShippingQuery } from "@/types/telegram"
import { ArgsOf } from "@/types/util"
import { TelegramMethodMap } from "@/types/telegram/methods"
import { Bot } from "@/api/bot"

export interface BaseContext<Raw> {
    raw: Raw
    update_id: number
}

export class MessageContext implements BaseContext<Message> {
    constructor(public raw: Message, public update_id: number, private bot: Bot) { }

    async reply(text: string, extra?: object) {
        return this.bot.request("sendMessage", {
            chat_id: this.raw.chat.id,
            text,
            reply_parameters: {
                message_id: this.raw.message_id
            },
            ...extra,
        })
    }

    async delete() {
        return this.bot.request("deleteMessage", {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
        })
    }

    async react(emoji: AllowedReaction) {
        return this.bot.request("setMessageReaction", {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
            reaction: [{ type: "emoji", emoji }],
        })
    }

    async forward(to_chat_id: number | string) {
        return this.bot.request("forwardMessage", {
            chat_id: to_chat_id,
            from_chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
        })
    }

    async pin(disableNotification = false) {
        return this.bot.request("pinChatMessage", {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
            disable_notification: disableNotification,
        })
    }

    async unpin() {
        return this.bot.request("unpinChatMessage", {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
        })
    }
}

export class CallbackQueryContext implements BaseContext<CallbackQuery> {
    constructor(public raw: CallbackQuery, public update_id: number, private bot: Bot) { }

    async answer(text?: string, showAlert = false, cacheTime = 0) {
        return this.bot.request("answerCallbackQuery", {
            callback_query_id: this.raw.id,
            text,
            show_alert: showAlert,
            cache_time: cacheTime,
        })
    }

    async editMessageText(text: string, extra?: Partial<ArgsOf<TelegramMethodMap["editMessageText"]>>) {
        const params: ArgsOf<TelegramMethodMap["editMessageText"]> = {
            text,
            ...extra,
        }

        if (this.raw.message) {
            params.chat_id = this.raw.message.chat.id
            params.message_id = this.raw.message.message_id
        } else if (this.raw.inline_message_id) {
            params.inline_message_id = this.raw.inline_message_id
        }

        return this.bot.request("editMessageText", params)
    }

    async editMessageReplyMarkup(replyMarkup?: object) {
        const params: any = {}
        if (this.raw.message) {
            params.chat_id = this.raw.message.chat.id
            params.message_id = this.raw.message.message_id
        } else if (this.raw.inline_message_id) {
            params.inline_message_id = this.raw.inline_message_id
        }
        params.reply_markup = replyMarkup
        return this.bot.request("editMessageReplyMarkup", params)
    }

    async deleteMessage() {
        if (!this.raw.message) throw new Error("No message to delete")
        return this.bot.request("deleteMessage", {
            chat_id: this.raw.message.chat.id,
            message_id: this.raw.message.message_id,
        })
    }
}

export class InlineQueryContext implements BaseContext<InlineQuery> {
    constructor(public raw: InlineQuery, public update_id: number, private bot: Bot) { }

    async answer(options: ArgsOf<TelegramMethodMap["answerInlineQuery"]>) {
        return this.bot.request("answerInlineQuery", options)
    }
}

export class PollContext implements BaseContext<Poll> {
    constructor(public raw: Poll, public update_id: number, private bot: Bot) { }

    async stop(chat_id: number | string, message_id: number) {
        return this.bot.request("stopPoll", {
            chat_id,
            message_id,
        })
    }
}

export class PollAnswerContext implements BaseContext<PollAnswer> {
    constructor(public raw: PollAnswer, public update_id: number, private bot: Bot) { }
}

export class ChatMemberUpdatedContext implements BaseContext<ChatMemberUpdated> {
    constructor(public raw: ChatMemberUpdated, public update_id: number, private bot: Bot) { }

    get oldStatus() {
        return this.raw.old_chat_member.status
    }

    get newStatus() {
        return this.raw.new_chat_member.status
    }

    async approveJoinRequest() {
        return this.bot.request("approveChatJoinRequest", {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        })
    }

    async declineJoinRequest() {
        return this.bot.request("declineChatJoinRequest", {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        })
    }
}

export class ChatJoinRequestContext implements BaseContext<ChatJoinRequest> {
    constructor(public raw: ChatJoinRequest, public update_id: number, private bot: Bot) { }

    async approve() {
        return this.bot.request("approveChatJoinRequest", {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        })
    }

    async decline() {
        return this.bot.request("declineChatJoinRequest", {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        })
    }
}

export class ShippingQueryContext implements BaseContext<ShippingQuery> {
    constructor(public raw: ShippingQuery, public update_id: number, private bot: Bot) { }

    async answerOk(shipping_options: ShippingOption[]) {
        return this.bot.request("answerShippingQuery", {
            shipping_query_id: this.raw.id,
            shipping_options,
            ok: true,
        })
    }

    async answerError(error_message: string) {
        return this.bot.request("answerShippingQuery", {
            shipping_query_id: this.raw.id,
            ok: false,
            error_message,
        })
    }
}

export class PreCheckoutQueryContext implements BaseContext<PreCheckoutQuery> {
    constructor(public raw: PreCheckoutQuery, public update_id: number, private bot: Bot) { }

    async answerOk() {
        return this.bot.request("answerPreCheckoutQuery", {
            pre_checkout_query_id: this.raw.id,
            ok: true,
        })
    }

    async answerError(error_message: string) {
        return this.bot.request("answerPreCheckoutQuery", {
            pre_checkout_query_id: this.raw.id,
            ok: false,
            error_message,
        })
    }
}

export const ContextClassMap = {
    message: MessageContext,
    edited_message: MessageContext,
    channel_post: MessageContext,
    edited_channel_post: MessageContext,
    business_message: MessageContext,
    edited_business_message: MessageContext,

    callback_query: CallbackQueryContext,

    inline_query: InlineQueryContext,

    poll: PollContext,
    poll_answer: PollAnswerContext,

    my_chat_member: ChatMemberUpdatedContext,
    chat_member: ChatMemberUpdatedContext,
    chat_join_request: ChatJoinRequestContext,

    shipping_query: ShippingQueryContext,
    pre_checkout_query: PreCheckoutQueryContext
} as const
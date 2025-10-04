import {
    AllowedReaction,
    CallbackQuery,
    ChatJoinRequest,
    ChatMemberUpdated,
    InlineQuery,
    ParsedEntity,
    Poll,
    PreCheckoutQuery,
    ShippingOption,
    ShippingQuery,
} from '@/types/telegram';
import { ArgsOf } from '@/types/util';
import { TelegramMethodMap } from '@/types/telegram/methods';
import { Bot } from '@/api/bot';
import {
    BotEventMap,
    Command,
    TelegramEventMap,
} from '@/types/telegram/events';

export interface BaseContext<Raw> {
    raw: Raw;
}

export class MessageContext
    implements BaseContext<TelegramEventMap['message']>
{
    constructor(
        public raw: TelegramEventMap['message'],
        private bot: Bot,
    ) {}

    get entities(): ParsedEntity[] {
        if (!this.raw.entities || !this.raw.text) return [];

        return this.raw.entities.map((entity, index) => ({
            content: this.raw.text!.slice(
                entity.offset,
                entity.offset + entity.length,
            ),
            index,
            ...entity,
        }));
    }

    async reply(text: string, extra?: object) {
        return this.bot.request('sendMessage', {
            chat_id: this.raw.chat.id,
            text,
            reply_parameters: {
                message_id: this.raw.message_id,
            },
            ...extra,
        });
    }

    async delete() {
        return this.bot.request('deleteMessage', {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
        });
    }

    async react(emoji: AllowedReaction) {
        return this.bot.request('setMessageReaction', {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
            reaction: [{ type: 'emoji', emoji }],
        });
    }

    async forward(to_chat_id: number | string) {
        return this.bot.request('forwardMessage', {
            chat_id: to_chat_id,
            from_chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
        });
    }

    async pin(disableNotification = false) {
        return this.bot.request('pinChatMessage', {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
            disable_notification: disableNotification,
        });
    }

    async unpin() {
        return this.bot.request('unpinChatMessage', {
            chat_id: this.raw.chat.id,
            message_id: this.raw.message_id,
        });
    }
}

export class CommandContext extends MessageContext {
    public commands: BotEventMap['command']['commands'];

    constructor(cmd: BotEventMap['command'], bot: Bot) {
        super(cmd.message, bot);
        this.commands = cmd.commands;
    }

    get first(): Command | undefined {
        return this.commands[0];
    }
}

export class CallbackQueryContext
    implements BaseContext<TelegramEventMap['callback_query']>
{
    constructor(
        public raw: CallbackQuery,
        private bot: Bot,
    ) {}

    async answer(text?: string, showAlert = false, cacheTime = 0) {
        return this.bot.request('answerCallbackQuery', {
            callback_query_id: this.raw.id,
            text,
            show_alert: showAlert,
            cache_time: cacheTime,
        });
    }

    async editMessageText(
        text: string,
        extra?: Partial<ArgsOf<TelegramMethodMap['editMessageText']>>,
    ) {
        const params: ArgsOf<TelegramMethodMap['editMessageText']> = {
            text,
            ...extra,
        };

        if (this.raw.message) {
            params.chat_id = this.raw.message.chat.id;
            params.message_id = this.raw.message.message_id;
        } else if (this.raw.inline_message_id) {
            params.inline_message_id = this.raw.inline_message_id;
        }

        return this.bot.request('editMessageText', params);
    }

    async editMessageReplyMarkup(replyMarkup?: object) {
        const params: any = {};
        if (this.raw.message) {
            params.chat_id = this.raw.message.chat.id;
            params.message_id = this.raw.message.message_id;
        } else if (this.raw.inline_message_id) {
            params.inline_message_id = this.raw.inline_message_id;
        }
        params.reply_markup = replyMarkup;
        return this.bot.request('editMessageReplyMarkup', params);
    }

    async deleteMessage() {
        if (!this.raw.message) throw new Error('No message to delete');
        return this.bot.request('deleteMessage', {
            chat_id: this.raw.message.chat.id,
            message_id: this.raw.message.message_id,
        });
    }
}

export class InlineQueryContext
    implements BaseContext<TelegramEventMap['inline_query']>
{
    constructor(
        public raw: InlineQuery,
        private bot: Bot,
    ) {}

    async answer(options: ArgsOf<TelegramMethodMap['answerInlineQuery']>) {
        return this.bot.request('answerInlineQuery', options);
    }
}

export class PollContext implements BaseContext<TelegramEventMap['poll']> {
    constructor(
        public raw: Poll,
        private bot: Bot,
    ) {}

    async stop(chat_id: number | string, message_id: number) {
        return this.bot.request('stopPoll', {
            chat_id,
            message_id,
        });
    }
}

export class ChatMemberUpdatedContext
    implements BaseContext<TelegramEventMap['chat_member']>
{
    constructor(
        public raw: ChatMemberUpdated,
        private bot: Bot,
    ) {}

    get oldStatus() {
        return this.raw.old_chat_member.status;
    }

    get newStatus() {
        return this.raw.new_chat_member.status;
    }

    async approveJoinRequest() {
        return this.bot.request('approveChatJoinRequest', {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        });
    }

    async declineJoinRequest() {
        return this.bot.request('declineChatJoinRequest', {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        });
    }
}

export class ChatJoinRequestContext
    implements BaseContext<TelegramEventMap['chat_join_request']>
{
    constructor(
        public raw: ChatJoinRequest,
        private bot: Bot,
    ) {}

    async approve() {
        return this.bot.request('approveChatJoinRequest', {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        });
    }

    async decline() {
        return this.bot.request('declineChatJoinRequest', {
            chat_id: this.raw.chat.id,
            user_id: this.raw.from.id,
        });
    }
}

export class ShippingQueryContext
    implements BaseContext<TelegramEventMap['shipping_query']>
{
    constructor(
        public raw: ShippingQuery,
        private bot: Bot,
    ) {}

    async answerOk(shipping_options: ShippingOption[]) {
        return this.bot.request('answerShippingQuery', {
            shipping_query_id: this.raw.id,
            shipping_options,
            ok: true,
        });
    }

    async answerError(error_message: string) {
        return this.bot.request('answerShippingQuery', {
            shipping_query_id: this.raw.id,
            ok: false,
            error_message,
        });
    }
}

export class PreCheckoutQueryContext
    implements BaseContext<TelegramEventMap['pre_checkout_query']>
{
    constructor(
        public raw: PreCheckoutQuery,
        private bot: Bot,
    ) {}

    async answerOk() {
        return this.bot.request('answerPreCheckoutQuery', {
            pre_checkout_query_id: this.raw.id,
            ok: true,
        });
    }

    async answerError(error_message: string) {
        return this.bot.request('answerPreCheckoutQuery', {
            pre_checkout_query_id: this.raw.id,
            ok: false,
            error_message,
        });
    }
}

export const ContextClassMap = {
    message: MessageContext,
    edited_message: MessageContext,
    channel_post: MessageContext,
    edited_channel_post: MessageContext,
    business_message: MessageContext,
    edited_business_message: MessageContext,

    command: CommandContext,

    callback_query: CallbackQueryContext,

    inline_query: InlineQueryContext,

    poll: PollContext,

    my_chat_member: ChatMemberUpdatedContext,
    chat_member: ChatMemberUpdatedContext,
    chat_join_request: ChatJoinRequestContext,

    shipping_query: ShippingQueryContext,
    pre_checkout_query: PreCheckoutQueryContext,
} as const;

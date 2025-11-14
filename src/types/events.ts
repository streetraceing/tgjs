import {
    BusinessConnection,
    BusinessMessagesDeleted,
    CallbackQuery,
    ChatBoostRemoved,
    ChatBoostUpdated,
    ChatJoinRequest,
    ChatMemberUpdated,
    ChosenInlineResult,
    InlineQuery,
    Message,
    MessageReactionCountUpdated,
    MessageReactionUpdated,
    PaidMediaPurchased,
    Poll,
    PollAnswer,
    PreCheckoutQuery,
    ShippingQuery,
    Update,
} from '@/types/telegram';

export const UpdateEventMap: {
    [K in keyof TelegramEventMap]: (
        u: Update,
    ) => TelegramEventMap[K] | undefined;
} = {
    update: (u) => u,
    message: (u) => u.message,
    edited_message: (u) => u.edited_message,
    channel_post: (u) => u.channel_post,
    edited_channel_post: (u) => u.edited_channel_post,
    business_connection: (u) => u.business_connection,
    business_message: (u) => u.business_message,
    edited_business_message: (u) => u.edited_business_message,
    deleted_business_messages: (u) => u.deleted_business_messages,
    message_reaction: (u) => u.message_reaction,
    message_reaction_count: (u) => u.message_reaction_count,
    inline_query: (u) => u.inline_query,
    chosen_inline_result: (u) => u.chosen_inline_result,
    callback_query: (u) => u.callback_query,
    shipping_query: (u) => u.shipping_query,
    pre_checkout_query: (u) => u.pre_checkout_query,
    purchased_paid_media: (u) => u.purchased_paid_media,
    poll: (u) => u.poll,
    poll_answer: (u) => u.poll_answer,
    my_chat_member: (u) => u.my_chat_member,
    chat_member: (u) => u.chat_member,
    chat_join_request: (u) => u.chat_join_request,
    chat_boost: (u) => u.chat_boost,
    removed_chat_boost: (u) => u.removed_chat_boost,
};

export const TELEGRAM_EVENT_NAMES = Object.keys(UpdateEventMap) as Array<
    keyof TelegramEventMap
>;

export const TELEGRAM_EVENT_SET = new Set<string>(
    TELEGRAM_EVENT_NAMES.map(String),
);

export type TelegramEventMap = {
    update: Update;
    message: Message;
    edited_message: Message;
    channel_post: Message;
    edited_channel_post: Message;
    business_connection: BusinessConnection;
    business_message: Message;
    edited_business_message: Message;
    deleted_business_messages: BusinessMessagesDeleted;
    message_reaction: MessageReactionUpdated;
    message_reaction_count: MessageReactionCountUpdated;
    inline_query: InlineQuery;
    chosen_inline_result: ChosenInlineResult;
    callback_query: CallbackQuery;
    shipping_query: ShippingQuery;
    pre_checkout_query: PreCheckoutQuery;
    purchased_paid_media: PaidMediaPurchased;
    poll: Poll;
    poll_answer: PollAnswer;
    my_chat_member: ChatMemberUpdated;
    chat_member: ChatMemberUpdated;
    chat_join_request: ChatJoinRequest;
    chat_boost: ChatBoostUpdated;
    removed_chat_boost: ChatBoostRemoved;
};

export type Command = {
    name: string;
    args: string[];
};

export type BotEventMap = TelegramEventMap & {
    command: {
        message: Message | never;
        commands: Command[];
    };
} & {
    [K in `callback_query:${string}`]: CallbackQuery;
}
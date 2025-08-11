import { ReadStream } from "fs"
import { TelegramEventMap } from "@/types/telegram/events"

export type InputFile = Buffer | ReadStream | string

export type AllowedUpdate = keyof TelegramEventMap

export const allowedReactions = [
    "❤", "👍", "👎", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱",
    "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡",
    "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡",
    "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈",
    "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨",
    "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿",
    "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", 
    "🤷", "🤷‍♀", "😡"
] as const

export type AllowedReaction = typeof allowedReactions[number]

export type Update = {
    update_id: number
    message?: Message
    edited_message?: Message
    channel_post?: Message
    edited_channel_post?: Message
    business_connection?: BusinessConnection
    business_message?: Message
    edited_business_message?: Message
    deleted_business_messages?: BusinessMessagesDeleted
    message_reaction?: MessageReactionUpdated
    message_reaction_count?: MessageReactionCountUpdated
    inline_query?: InlineQuery
    chosen_inline_result?: ChosenInlineResult
    callback_query?: CallbackQuery
    shipping_query?: ShippingQuery
    pre_checkout_query?: PreCheckoutQuery
    purchased_paid_media?: PaidMediaPurchased
    poll?: Poll
    poll_answer?: PollAnswer
    my_chat_member?: ChatMemberUpdated
    chat_member?: ChatMemberUpdated
    chat_join_request?: ChatJoinRequest
    chat_boost?: ChatBoostUpdated
    removed_chat_boost?: ChatBoostRemoved
}

export type WebhookInfo = {
    url: string
    has_custom_certificate: boolean
    pending_update_count: number
    ip_address?: string
    last_error_date?: number
    last_error_message?: string
    last_synchronization_error_date?: number
    max_connections?: number
    allowed_updates?: string[]
}

export type User = {
    id: number
    is_bot: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    is_premium?: true
    added_to_attachment_menu?: true
    can_join_groups?: boolean
    can_read_all_group_messages?: boolean
    supports_inline_queries?: boolean
    can_connect_to_business?: boolean
    has_main_web_app?: boolean
}

export type ChatType = "private" | "group" | "supergroup" | "channel"

export type Chat = {
    id: number
    type: ChatType
    title?: string
    username?: string
    first_name?: string
    last_name?: string
    is_forum?: true
}

export type ChatFullInfo = {
    id: number
    type: ChatType
    title?: string
    username?: string
    first_name?: string
    last_name?: string
    is_forum?: true
    accent_color_id: number
    max_reaction_count: number
    photo?: ChatPhoto
    active_usernames?: string[]
    birthdate?: Birthdate
    business_intro?: BusinessIntro
    business_location?: BusinessLocation
    business_opening_hours?: BusinessOpeningHours
    personal_chat?: Chat
    available_reactions?: ReactionType[]
    background_custom_emoji_id?: string
    profile_accent_color_id?: number
    profile_background_custom_emoji_id?: string
    emoji_status_custom_emoji_id?: string
    emoji_status_expiration_date?: number
    bio?: string
    has_private_forwards?: true
    has_restricted_voice_and_video_messages?: true
    join_to_send_messages?: true
    join_by_request?: true
    description?: string
    invite_link?: string
    pinned_message?: Message
    permissions?: ChatPermissions
    accepted_gift_types: AcceptedGiftTypes
    can_send_paid_media?: true
    slow_mode_delay?: number
    unrestrict_boost_count?: number
    message_auto_delete_time?: number
    has_aggressive_anti_spam_enabled?: true
    has_hidden_members?: true
    has_protected_content?: true
    has_visible_history?: true
    sticker_set_name?: string
    can_set_sticker_set?: true
    custom_emoji_sticker_set_name?: string
    linked_chat_id?: number
    location?: ChatLocation
}

export type Message = {
    message_id: number
    message_thread_id?: number
    from?: User
    sender_chat?: Chat
    sender_boost_count?: number
    sender_business_bot?: User
    date: number
    business_connection_id?: string
    chat: Chat
    forward_origin?: MessageOrigin
    is_topic_message?: true
    is_automatic_forward?: true
    reply_to_message?: Message
    external_reply?: ExternalReplyInfo
    quote?: TextQuote
    reply_to_story?: Story
    via_bot?: User
    edit_date?: number
    has_protected_content?: true
    is_from_offline?: true
    media_group_id?: string
    author_signature?: string
    paid_star_count?: number
    text?: string
    entities?: MessageEntity[]
    link_preview_options?: LinkPreviewOptions
    effect_id?: string
    animation?: Animation
    audio?: Audio
    document?: Document
    paid_media?: PaidMediaInfo
    photo?: PhotoSize[]
    sticker?: Sticker
    story?: Story
    video?: Video
    video_note?: VideoNote
    voice?: Voice
    caption?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: true
    has_media_spoiler?: true
    checklist?: Checklist
    contact?: Contact
    dice?: Dice
    game?: Game
    poll?: Poll
    venue?: Venue
    location?: Location
    new_chat_members?: User[]
    left_chat_member?: User
    new_chat_title?: string
    new_chat_photo?: PhotoSize[]
    delete_chat_photo?: true
    group_chat_created?: true
    supergroup_chat_created?: true
    channel_chat_created?: true
    message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged
    migrate_to_chat_id?: number
    migrate_from_chat_id?: number
    pinned_message?: MaybeInaccessibleMessage
    invoice?: Invoice
    successful_payment?: SuccessfulPayment
    refunded_payment?: RefundedPayment
    users_shared?: UsersShared
    chat_shared?: ChatShared
    gift?: GiftInfo
    unique_gift?: UniqueGiftInfo
    connected_website?: string
    write_access_allowed?: WriteAccessAllowed
    passport_data?: PassportData
    proximity_alert_triggered?: ProximityAlertTriggered
    boost_added?: ChatBoostAdded
    chat_background_set?: ChatBackground
    checklist_tasks_done?: ChecklistTasksDone
    checklist_tasks_added?: ChecklistTasksAdded
    direct_message_price_changed?: DirectMessagePriceChanged
    forum_topic_created?: ForumTopicCreated
    forum_topic_edited?: ForumTopicEdited
    forum_topic_closed?: never
    forum_topic_reopened?: never
    general_forum_topic_hidden?: never
    general_forum_topic_unhidden?: never
    giveaway_created?: GiveawayCreated
    giveaway?: Giveaway
    giveaway_winners?: GiveawayWinners
    giveaway_completed?: GiveawayCompleted
    paid_message_price_changed?: PaidMessagePriceChanged
    video_chat_scheduled?: VideoChatScheduled
    video_chat_started?: never
    video_chat_ended?: VideoChatEnded
    video_chat_participants_invited?: VideoChatParticipantsInvited
    web_app_data?: WebAppData
    reply_markup?: InlineKeyboardMarkup
}

export type MessageId = {
    message_id: number
}

export type MaybeInaccessibleMessage = Message | InaccessibleMessage

export type InaccessibleMessage = {
    chat: Chat
    message_id: number
    date: number
}

export type MessageEntityType = "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "code" | "pre" | "text_link" | "text_mention" | "custom_emoji"

export type MessageEntity = {
    type: MessageEntityType
    offset: number
    length: number
    url?: string
    user?: User
    language?: string
    custom_emoji_id?: string
}

export type TextQuote = {
    text: string
    entities?: MessageEntity[]
    position: number
    is_manual?: true
}

export type ExternalReplyInfo = {
    origin: MessageOrigin
    chat?: Chat
    message_id?: number
    link_preview_options?: LinkPreviewOptions
    animation?: Animation
    audio?: Audio
    document?: Document
    paid_media?: PaidMediaInfo
    photo?: PhotoSize[]
    sticker?: Sticker
    story?: Story
    video?: Video
    video_note?: VideoNote
    voice?: Voice
    has_media_spoiler?: true
    checklist?: Checklist
    contact?: Contact
    dice?: Dice
    game?: Game
    giveaway?: Giveaway
    giveaway_winners?: GiveawayWinners
    invoice?: Invoice
    location?: Location
    poll?: Poll
    venue?: Venue
}

export type ReplyParameters = {
    message_id: number
    chat_id?: number | string
    allow_sending_without_reply?: boolean
    quote?: string
    quote_parse_mode?: string
    quote_entities?: MessageEntity[]
    quote_position?: number
}

export type MessageOrigin = MessageOriginUser | MessageOriginHiddenUser | MessageOriginChat | MessageOriginChannel

export type MessageOriginUser = {
    type: "user"
    date: number
    sender_user: User
}

export type MessageOriginHiddenUser = {
    type: "hidden_user"
    date: number
    sender_user_name: string
}

export type MessageOriginChat = {
    type: "chat"
    date: number
    sender_chat: Chat
    author_signature?: string
}

export type MessageOriginChannel = {
    type: "channel"
    date: number
    chat: Chat
    message_id: number
    author_signature?: string
}

export type PhotoSize = {
    file_id: string
    file_unique_id: string
    width: number
    height: number
    file_size?: number
}

export type Animation = {
    file_id: string
    file_unique_id: string
    width: number
    height: number
    duration: number
    thumbnail?: PhotoSize
    file_name?: string
    mime_type?: string
    file_size?: number
}

export type Audio = {
    file_id: string
    file_unique_id: string
    duration: number
    performer?: string
    title?: string
    file_name?: string
    mime_type?: string
    file_size?: number
    thumbnail?: PhotoSize
}

export type Document = {
    file_id: string
    file_unique_id: string
    thumbnail?: PhotoSize
    file_name?: string
    mime_type?: string
    file_size?: number
}

export type Story = {
    chat: Chat
    id: number
}

export type Video = {
    file_id: string
    file_unique_id: string
    width: number
    height: number
    duration: number
    thumbnail?: PhotoSize
    cover?: PhotoSize[]
    start_timestamp?: number
    file_name?: string
    mime_type?: string
    file_size?: number
}

export type VideoNote = {
    file_id: string
    file_unique_id: string
    length: number
    duration: number
    thumbnail?: PhotoSize
    file_size?: number
}

export type Voice = {
    file_id: string
    file_unique_id: string
    duration: number
    mime_type?: string
    file_size?: number
}

export type PaidMedia = PaidMediaPreview | PaidMediaPhoto | PaidMediaVideo

export type PaidMediaInfo = {
    star_count: number
    paid_media: PaidMedia[]
}

export type PaidMediaPreview = {
    type: string
    width?: number
    height?: number
    duration?: number
}

export type PaidMediaPhoto = {
    type: string
    photo: PhotoSize[]
}

export type PaidMediaVideo = {
    type: string
    video: Video
}

export type Contact = {
    phone_number: string
    first_name: string
    last_name?: string
    user_id?: number
    vcard?: string
}

export type Dice = {
    emoji: string
    value: number
}

export type PollOption = {
    text: string
    text_entities?: MessageEntity[]
    voter_count: number
}

export type InputPollOption = {
    text: string
    text_parse_mode?: string
    text_entities?: MessageEntity[]
}

export type PollAnswer = {
    poll_id: string
    voter_chat?: Chat
    user?: User
    option_ids: number[]
}

export type Poll = {
    id: string
    question: string
    question_entities?: MessageEntity[]
    options: PollOption[]
    total_voter_count: number
    is_closed: boolean
    is_anonymous: boolean
    type: string
    allows_multiple_answers: boolean
    correct_option_id?: number
    explanation?: string
    explanation_entities?: MessageEntity[]
    open_period?: number
    close_date?: number
}

export type ChecklistTask = {
    id: number
    text: string
    text_entities?: MessageEntity[]
    completed_by_user?: User
    completion_date?: number
}

export type Checklist = {
    title: string
    title_entities?: MessageEntity[]
    tasks: ChecklistTask[]
    others_can_add_tasks?: true
    others_can_mark_tasks_as_done?: true
}

export type InputChecklistTask = {
    id: number
    text: string
    parse_mode?: string
    text_entities?: MessageEntity[]
}

export type InputChecklist = {
    title: string
    parse_mode?: string
    title_entities?: MessageEntity[]
    tasks: InputChecklistTask[]
    others_can_add_tasks?: boolean
    others_can_mark_tasks_as_done?: boolean
}

export type ChecklistTasksDone = {
    checklist_message?: Message
    marked_as_done_task_ids?: number[]
    marked_as_not_done_task_ids?: number[]
}

export type ChecklistTasksAdded = {
    checklist_message?: Message
    tasks: ChecklistTask[]
}

export type Location = {
    latitude: number
    longitude: number
    horizontal_accuracy?: number
    live_period?: number
    heading?: number
    proximity_alert_radius?: number
}

export type Venue = {
    location: Location
    title: string
    address: string
    foursquare_id?: string
    foursquare_type?: string
    google_place_id?: string
    google_place_type?: string
}

export type WebAppData = {
    data: string
    button_text: string
}

export type ProximityAlertTriggered = {
    traveler: User
    watcher: User
    distance: number
}

export type MessageAutoDeleteTimerChanged = {
    message_auto_delete_time: number
}

export type ChatBoostAdded = {
    boost_count: number
}

export type BackgroundFill = BackgroundFillSolid | BackgroundFillGradient | BackgroundFillFreeformGradient

export type BackgroundFillSolid = {
    type: "solid"
    color: number
}

export type BackgroundFillGradient = {
    type: "gradient"
    top_color: number
    bottom_color: number
    rotation_angle: number
}

export type BackgroundFillFreeformGradient = {
    type: "freeform_gradient"
    colors: number[]
}

export type BackgroundType = BackgroundTypeFill | BackgroundTypeWallpaper | BackgroundTypePattern | BackgroundTypeChatTheme

export type BackgroundTypeFill = {
    type: "fill"
    fill: BackgroundFill
    dark_theme_dimming: number
}

export type BackgroundTypeWallpaper = {
    type: "wallpaper"
    document: Document
    dark_theme_dimming: number
    is_blurred?: true
    is_moving?: true
}

export type BackgroundTypePattern = {
    type: "pattern"
    document: Document
    fill: BackgroundFill
    intensity: number
    is_inverted?: true
    is_moving?: true
}

export type BackgroundTypeChatTheme = {
    type: "chat_theme"
    theme_name: string
}

export type ChatBackground = {
    type: BackgroundType
}

export type ForumTopicCreated = {
    name: string
    icon_color: number
    icon_custom_emoji_id?: string
}

export type ForumTopicEdited = {
    name?: string
    icon_custom_emoji_id?: string
}

export type SharedUser = {
    user_id: number
    first_name?: string
    last_name?: string
    username?: string
    photo?: PhotoSize[]
}

export type UsersShared = {
    request_id: number
    users: SharedUser[]
}

export type ChatShared = {
    request_id: number
    chat_id: number
    title?: string
    username?: string
    photo?: PhotoSize[]
}

export type WriteAccessAllowed = {
    from_request?: boolean
    web_app_name?: string
    from_attachment_menu?: boolean
}

export type VideoChatScheduled = {
    start_date: number
}

export type VideoChatEnded = {
    duration: number
}

export type VideoChatParticipantsInvited = {
    users: User[]
}

export type PaidMessagePriceChanged = {
    paid_message_star_count: number
}

export type DirectMessagePriceChanged = {
    are_direct_messages_enabled: boolean
    direct_message_star_count?: number
}

export type GiveawayCreated = {
    prize_star_count?: number
}

export type Giveaway = {
    chats: Chat[]
    winners_selection_date: number
    winner_count: number
    only_new_members?: true
    has_public_winners?: true
    prize_description?: string
    country_codes?: string[]
    prize_star_count?: number
    premium_subscription_month_count?: number
}

export type GiveawayWinners = {
    chat: Chat
    giveaway_message_id: number
    winners_selection_date: number
    winner_count: number
    winners: User[]
    additional_chat_count?: number
    prize_star_count?: number
    premium_subscription_month_count?: number
    unclaimed_prize_count?: number
    only_new_members?: true
    was_refunded?: true
    prize_description?: string
}

export type GiveawayCompleted = {
    winner_count: number
    unclaimed_prize_count?: number
    giveaway_message?: Message
    is_star_giveaway?: true
}

export type LinkPreviewOptions = {
    is_disabled?: boolean
    url?: string
    prefer_small_media?: boolean
    prefer_large_media?: boolean
    show_above_text?: boolean
}

export type UserProfilePhotos = {
    total_count: number
    photos: PhotoSize[][]
}

export type WebAppInfo = {
    url: string
}

export type ReplyKeyboardMarkup = {
    keyboard: KeyboardButton[][]
    is_persistent?: boolean
    resize_keyboard?: boolean
    one_time_keyboard?: boolean
    input_field_placeholder?: string
    selective?: boolean
}

export type KeyboardButton = {
    text?: string
    request_users?: KeyboardButtonRequestUsers
    request_chat?: KeyboardButtonRequestChat
    request_contact?: boolean
    request_location?: boolean
    request_poll?: KeyboardButtonPollType
    web_app?: WebAppInfo
}

export type KeyboardButtonRequestUsers = {
    request_id: number
    user_is_bot?: boolean
    user_is_premium?: boolean
    max_quantity?: number
    request_name?: boolean
    request_username?: boolean
    request_photo?: boolean
}

export type KeyboardButtonRequestChat = {
    request_id: number
    chat_is_channel: boolean
    chat_is_forum?: boolean
    chat_has_username?: boolean
    chat_is_created?: boolean
    user_administrator_rights?: ChatAdministratorRights
    bot_administrator_rights?: ChatAdministratorRights
    bot_is_member?: boolean
    request_title?: boolean
    request_username?: boolean
    request_photo?: boolean
}

export type KeyboardButtonPollType = {
    type?: "quiz" | "regular"
}

export type ReplyKeyboardRemove = {
    remove_keyboard: true
    selective?: boolean
}

export type InlineKeyboardMarkup = {
    inline_keyboard: InlineKeyboardButton[][]
}

export type InlineKeyboardButton = {
    text: string
    url?: string
    callback_data?: string
    web_app?: WebAppInfo
    login_url?: LoginUrl
    switch_inline_query?: string
    switch_inline_query_current_chat?: string
    switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat
    copy_text?: CopyTextButton
    callback_game?: never
    pay?: boolean
}

export type LoginUrl = {
    url: string
    forward_text: string
    bot_username: string
    request_write_access: boolean
}

export type SwitchInlineQueryChosenChat = {
    query?: string
    allow_user_chats?: boolean
    allow_bot_chats?: boolean
    allow_group_chats?: boolean
    allow_channel_chats?: boolean
}

export type CopyTextButton = {
    text: string
}

export type CallbackQuery = {
    id: string
    from: User
    message?: MaybeInaccessibleMessage
    inline_message_id?: string
    chat_instance: string
    data?: string
    game_short_name?: string
}

export type ForceReply = {
    force_reply: true
    input_field_placeholder?: string
    selective?: boolean
}

export type ChatPhoto = {
    small_file_id: string
    small_file_unique_id: string
    big_file_id: string
    big_file_unique_id: string
}

export type ChatInviteLink = {
    invite_link: string
    creator: User
    creates_join_request: boolean
    is_primary: boolean
    is_revoked: boolean
    name?: string
    expire_date?: number
    member_limit?: number
    pending_join_request_count?: number
    subscription_period?: number
    subscription_price?: number
}

export type ChatAdministratorRights = {
    is_anonymous: boolean
    can_manage_chat: boolean
    can_delete_messages: boolean
    can_manage_video_chats: boolean
    can_restrict_members: boolean
    can_promote_members: boolean
    can_change_info: boolean
    can_invite_users: boolean
    can_post_stories: boolean
    can_edit_stories: boolean
    can_delete_stories: boolean
    can_post_messages?: boolean
    can_edit_messages?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
}

export type ChatMemberUpdated = {
    chat: Chat
    from: User
    date: number
    old_chat_member: ChatMember
    new_chat_member: ChatMember
    invite_link?: ChatInviteLink
    via_join_request?: boolean
    via_chat_folder_invite_link?: boolean
}

export type ChatMember = ChatMemberOwner | ChatMemberAdministrator | ChatMemberBanned | ChatMemberLeft | ChatMemberRestricted | ChatMemberMember

export type ChatMemberOwner = {
    status: string
    user: User
    is_anonymous: boolean
    custom_title?: string
}

export type ChatMemberAdministrator = {
    status: string
    user: User
    can_be_edited: boolean
    is_anonymous: boolean
    can_manage_chat: boolean
    can_delete_messages: boolean
    can_manage_video_chats: boolean
    can_restrict_members: boolean
    can_promote_members: boolean
    can_change_info: boolean
    can_invite_users: boolean
    can_post_stories: boolean
    can_edit_stories: boolean
    can_delete_stories: boolean
    can_post_messages?: boolean
    can_edit_messages?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
    custom_title?: string
}

export type ChatMemberMember = {
    status: string
    user: User
    until_date?: number
}

export type ChatMemberRestricted = {
    status: string
    user: User
    is_member: boolean
    can_send_messages: boolean
    can_send_audios: boolean
    can_send_documents: boolean
    can_send_photos: boolean
    can_send_videos: boolean
    can_send_video_notes: boolean
    can_send_voice_notes: boolean
    can_send_polls: boolean
    can_send_other_messages: boolean
    can_add_web_page_previews: boolean
    can_change_info: boolean
    can_invite_users: boolean
    can_pin_messages: boolean
    can_manage_topics: boolean
    until_date: number
}

export type ChatMemberLeft = {
    status: string
    user: User
}

export type ChatMemberBanned = {
    status: string
    user: User
    until_date: number
}

export type ChatJoinRequest = {
    chat: Chat
    from: User
    user_chat_id: number
    date: number
    bio?: string
    invite_link?: ChatInviteLink
}

export type ChatPermissions = {
    can_send_messages?: boolean
    can_send_audios?: boolean
    can_send_documents?: boolean
    can_send_photos?: boolean
    can_send_videos?: boolean
    can_send_video_notes?: boolean
    can_send_voice_notes?: boolean
    can_send_polls?: boolean
    can_send_other_messages?: boolean
    can_add_web_page_previews?: boolean
    can_change_info?: boolean
    can_invite_users?: boolean
    can_pin_messages?: boolean
    can_manage_topics?: boolean
}

export type Birthdate = {
    day: number
    month: number
    year?: number
}

export type BusinessIntro = {
    title?: string
    message?: string
    sticker?: Sticker
}

export type BusinessLocation = {
    address: string
    location?: Location
}

export type BusinessOpeningHoursInterval = {
    opening_minute: number
    closing_minute: number
}

export type BusinessOpeningHours = {
    time_zone_name: string
    opening_hours: BusinessOpeningHoursInterval[]
}

export type StoryAreaPosition = {
    x_percentage: number
    y_percentage: number
    width_percentage: number
    height_percentage: number
    rotation_angle: number
    corner_radius_percentage: number
}

export type LocationAddress = {
    country_code: string
    state?: string
    city?: string
    street?: string
}

export type StoryAreaType = StoryAreaTypeLink | StoryAreaTypeLocation | StoryAreaTypeSuggestedReaction | StoryAreaTypeUniqueGift | StoryAreaTypeWeather

export type StoryAreaTypeLocation = {
    type: string
    latitude: number
    longitude: number
    address?: LocationAddress
}

export type StoryAreaTypeSuggestedReaction = {
    type: string
    reaction_type: ReactionType
    is_dark?: boolean
    is_flipped?: boolean
}

export type StoryAreaTypeLink = {
    type: string
    url: string
}

export type StoryAreaTypeWeather = {
    type: string
    temperature: number
    emoji: string
    background_color: number
}

export type StoryAreaTypeUniqueGift = {
    type: string
    name: string
}

export type StoryArea = {
    position: StoryAreaPosition
    type: StoryAreaType
}

export type ChatLocation = {
    location: Location
    address: string
}

export type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji | ReactionTypePaid

export type ReactionTypeEmoji = {
    type: "emoji"
    emoji: AllowedReaction
}

export type ReactionTypeCustomEmoji = {
    type: "custom_emoji"
    custom_emoji_id: string
}

export type ReactionTypePaid = {
    type: "paid"
}

export type ReactionCount = {
    type: ReactionType
    total_count: number
}

export type MessageReactionUpdated = {
    chat: Chat
    message_id: number
    user?: User
    actor_chat?: Chat
    date: number
    old_reaction: ReactionType[]
    new_reaction: ReactionType[]
}

export type MessageReactionCountUpdated = {
    chat: Chat
    message_id: number
    date: number
    reactions: ReactionCount[]
}

export type ForumTopic = {
    message_thread_id: number
    name: string
    icon_color: number
    icon_custom_emoji_id?: string
}

export type Gift = {
    id: string
    sticker: Sticker
    star_count: number
    upgrade_star_count?: number
    total_count?: number
    remaining_count?: number
}

export type Gifts = {
    gifts: Gift[]
}

export type UniqueGiftModel = {
    name: string
    sticker: Sticker
    rarity_per_mille: number
}

export type UniqueGiftSymbol = {
    name: string
    sticker: Sticker
    rarity_per_mille: number
}

export type UniqueGiftBackdropColors = {
    center_color: number
    edge_color: number
    symbol_color: number
    text_color: number
}

export type UniqueGiftBackdrop = {
    name: string
    colors: UniqueGiftBackdropColors
    rarity_per_mille: number
}

export type UniqueGift = {
    base_name: string
    name: string
    number: number
    model: UniqueGiftModel
    symbol: UniqueGiftSymbol
    backdrop: UniqueGiftBackdrop
}

export type GiftInfo = {
    gift: Gift
    owned_gift_id?: string
    convert_star_count?: number
    prepaid_upgrade_star_count?: number
    can_be_upgraded?: true
    text?: string
    entities?: MessageEntity[]
    is_private?: true
}

export type UniqueGiftInfo = {
    gift: UniqueGift
    origin: string
    last_resale_star_count?: number
    owned_gift_id?: string
    transfer_star_count?: number
    next_transfer_date?: number
}

export type OwnedGiftRegular = {
    type: string
    gift: Gift
    owned_gift_id?: string
    sender_user?: User
    send_date: number
    text?: string
    entities?: MessageEntity[]
    is_private?: true
    is_saved?: true
    can_be_upgraded?: true
    was_refunded?: true
    convert_star_count?: number
    prepaid_upgrade_star_count?: number
}

export type OwnedGiftUnique = {
    type: string
    gift: UniqueGift
    owned_gift_id?: string
    sender_user?: User
    send_date: number
    is_saved?: true
    can_be_transferred?: true
    transfer_star_count?: number
    next_transfer_date?: number
}

export type OwnedGift = OwnedGiftRegular | OwnedGiftUnique

export type OwnedGifts = {
    total_count: number
    gifts: OwnedGift[]
    next_offset?: string
}

export type AcceptedGiftTypes = {
    unlimited_gifts: boolean
    limited_gifts: boolean
    unique_gifts: boolean
    premium_subscription: boolean
}

export type StarAmount = {
    amount: number
    nanostar_amount?: number
}

export type BotCommand = {
    command: string
    description: string
}

export type BotCommandScope = BotCommandScopeDefault | BotCommandScopeAllPrivateChats | BotCommandScopeAllGroupChats | BotCommandScopeAllChatAdministrators | BotCommandScopeChat | BotCommandScopeChatAdministrators | BotCommandScopeChatMember

export type BotCommandScopeDefault = {
    type: string
}

export type BotCommandScopeAllPrivateChats = {
    type: string
}

export type BotCommandScopeAllGroupChats = {
    type: string
}

export type BotCommandScopeAllChatAdministrators = {
    type: string
}

export type BotCommandScopeChat = {
    type: string
    chat_id: number | string
}

export type BotCommandScopeChatAdministrators = {
    type: string
    chat_id: number | string
}

export type BotCommandScopeChatMember = {
    type: string
    chat_id: number | string
    user_id: number
}

export type BotName = {
    name: string
}

export type BotDescription = {
    description: string
}

export type BotShortDescription = {
    short_description: string
}

export type MenuButton = MenuButtonCommands | MenuButtonWebApp | MenuButtonDefault

export type MenuButtonCommands = {
    type: string
}

export type MenuButtonWebApp = {
    type: string
    text: string
    web_app: WebAppInfo
}

export type MenuButtonDefault = {
    type: string
}

export type ChatBoostSource = ChatBoostSourceGiftCode | ChatBoostSourceGiveaway | ChatBoostSourcePremium

export type ChatBoostSourcePremium = {
    source: string
    user: User
}

export type ChatBoostSourceGiftCode = {
    source: string
    user: User
}

export type ChatBoostSourceGiveaway = {
    source: string
    giveaway_message_id: number
    user?: User
    prize_star_count?: number
    is_unclaimed?: true
}

export type ChatBoost = {
    boost_id: string
    add_date: number
    expiration_date: number
    source: ChatBoostSource
}

export type ChatBoostUpdated = {
    chat: Chat
    boost: ChatBoost
}

export type ChatBoostRemoved = {
    chat: Chat
    boost_id: string
    remove_date: number
    source: ChatBoostSource
}

export type UserChatBoosts = {
    boosts: ChatBoost[]
}

export type BusinessBotRights = {
    can_reply?: true
    can_read_messages?: true
    can_delete_sent_messages?: true
    can_delete_all_messages?: true
    can_edit_name?: true
    can_edit_bio?: true
    can_edit_profile_photo?: true
    can_edit_username?: true
    can_change_gift_settings?: true
    can_view_gifts_and_stars?: true
    can_convert_gifts_to_stars?: true
    can_transfer_and_upgrade_gifts?: true
    can_transfer_stars?: true
    can_manage_stories?: true
}

export type BusinessConnection = {
    id: string
    user: User
    user_chat_id: number
    date: number
    rights?: BusinessBotRights
    is_enabled: boolean
}

export type BusinessMessagesDeleted = {
    business_connection_id: string
    chat: Chat
    message_ids: number[]
}

export type ResponseParameters = {
    migrate_to_chat_id?: number
    retry_after?: number
}

export type InputMedia = InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo

export type InputMediaPhoto = {
    type: string
    media: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    has_spoiler?: boolean
}

export type InputMediaVideo = {
    type: string
    media: string
    thumbnail?: string
    cover?: string
    start_timestamp?: number
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    width?: number
    height?: number
    duration?: number
    supports_streaming?: boolean
    has_spoiler?: boolean
}

export type InputMediaAnimation = {
    type: string
    media: string
    thumbnail?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    width?: number
    height?: number
    duration?: number
    has_spoiler?: boolean
}

export type InputMediaAudio = {
    type: string
    media: string
    thumbnail?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    duration?: number
    performer?: string
    title?: string
}

export type InputMediaDocument = {
    type: string
    media: string
    thumbnail?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    disable_content_type_detection?: boolean
}

export type InputPaidMedia = InputPaidMediaPhoto | InputPaidMediaVideo

export type InputPaidMediaPhoto = {
    type: string
    media: string
}

export type InputPaidMediaVideo = {
    type: string
    media: string
    thumbnail?: string
    cover?: string
    start_timestamp?: number
    width?: number
    height?: number
    duration?: number
    supports_streaming?: boolean
}

export type InputProfilePhoto = InputProfilePhotoStatic | InputProfilePhotoAnimated

export type InputProfilePhotoStatic = {
    type: string
    photo: string
}

export type InputProfilePhotoAnimated = {
    type: string
    animation: string
    main_frame_timestamp?: number
}

export type InputStoryContent = InputStoryContentPhoto | InputStoryContentVideo

export type InputStoryContentPhoto = {
    type: string
    photo: string
}

export type InputStoryContentVideo = {
    type: string
    video: string
    duration?: number
    cover_frame_timestamp?: number
    is_animation?: boolean
}

export type Sticker = {
    file_id: string
    file_unique_id: string
    type: string
    width: number
    height: number
    is_animated: boolean
    is_video: boolean
    thumbnail?: PhotoSize
    emoji?: string
    set_name?: string
    premium_animation?: File
    mask_position?: MaskPosition
    custom_emoji_id?: string
    needs_repainting?: true
    file_size?: number
}

export type StickerSet = {
    name: string
    title: string
    sticker_type: string
    stickers: Sticker[]
    thumbnail?: PhotoSize
}

export type MaskPosition = {
    point: string
    x_shift: number
    y_shift: number
    scale: number
}

export type InputSticker = {
    sticker: string
    format: string
    emoji_list: string[]
    mask_position?: MaskPosition
    keywords?: string[]
}

export type InlineQuery = {
    id: string
    from: User
    query: string
    offset: string
    chat_type?: string
    location?: Location
}

export type InlineQueryResultsButton = {
    text: string
    web_app?: WebAppInfo
    start_parameter?: string
}

export type InlineQueryResult = InlineQueryResultCachedAudio | InlineQueryResultCachedDocument | InlineQueryResultCachedGif | InlineQueryResultCachedMpeg4Gif | InlineQueryResultCachedPhoto | InlineQueryResultCachedSticker | InlineQueryResultCachedVideo | InlineQueryResultCachedVoice | InlineQueryResultArticle | InlineQueryResultAudio | InlineQueryResultContact | InlineQueryResultGame | InlineQueryResultDocument | InlineQueryResultGif | InlineQueryResultLocation | InlineQueryResultMpeg4Gif | InlineQueryResultPhoto | InlineQueryResultVenue | InlineQueryResultVideo | InlineQueryResultVoice

export type InlineQueryResultArticle = {
    type: "article"
    id: string
    title: string
    input_message_content: InputMessageContent
    reply_markup?: InlineKeyboardMarkup
    url?: string
    description?: string
    thumbnail_url?: string
    thumbnail_width?: number
    thumbnail_height?: number
}

export type InlineQueryResultPhoto = {
    type: "photo"
    id: string
    photo_url: string
    thumbnail_url: string
    photo_width?: number
    photo_height?: number
    title?: string
    description?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultVideo = {
    type: "video"
    id: string
    video_url: string
    mime_type: string
    thumbnail_url: string
    title: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    video_width?: number
    video_height?: number
    video_duration?: number
    description?: string
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultGif = {
    type: "gif"
    id: string
    gif_url: string
    gif_width?: number
    gif_height?: number
    gif_duration?: number
    thumbnail_url: string
    thumbnail_mime_type?: string
    title?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultMpeg4Gif = {
    type: "mpeg4_gif"
    id: string
    mpeg4_url: string
    mpeg4_width?: number
    mpeg4_height?: number
    mpeg4_duration?: number
    thumbnail_url: string
    thumbnail_mime_type?: string
    title?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultAudio = {
    type: "audio"
    id: string
    audio_url: string
    title: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    performer?: string
    audio_duration?: number
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultVoice = {
    type: "voice"
    id: string
    voice_url: string
    title: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    voice_duration?: number
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultDocument = {
    type: "document"
    id: string
    title: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    document_url: string
    mime_type: string
    description?: string
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
    thumbnail_url?: string
    thumbnail_width?: number
    thumbnail_height?: number
}

export type InlineQueryResultLocation = {
    type: "location"
    id: string
    latitude: number
    longitude: number
    title: string
    horizontal_accuracy?: number
    live_period?: number
    heading?: number
    proximity_alert_radius?: number
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
    thumbnail_url?: string
    thumbnail_width?: number
    thumbnail_height?: number
}

export type InlineQueryResultVenue = {
    type: "venue"
    id: string
    latitude: number
    longitude: number
    title: string
    address: string
    foursquare_id?: string
    foursquare_type?: string
    google_place_id?: string
    google_place_type?: string
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
    thumbnail_url?: string
    thumbnail_width?: number
    thumbnail_height?: number
}

export type InlineQueryResultContact = {
    type: "contact"
    id: string
    phone_number: string
    first_name: string
    last_name?: string
    vcard?: string
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
    thumbnail_url?: string
    thumbnail_width?: number
    thumbnail_height?: number
}

export type InlineQueryResultGame = {
    type: "game"
    id: string
    game_short_name: string
    reply_markup?: InlineKeyboardMarkup
}

export type InlineQueryResultCachedPhoto = {
    type: "photo"
    id: string
    photo_file_id: string
    title?: string
    description?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedGif = {
    type: "gif"
    id: string
    gif_file_id: string
    title?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedMpeg4Gif = {
    type: "mpeg4_gif"
    id: string
    mpeg4_file_id: string
    title?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedSticker = {
    type: "sticker"
    id: string
    sticker_file_id: string
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedDocument = {
    type: "document"
    id: string
    title: string
    document_file_id: string
    description?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedVideo = {
    type: "video"
    id: string
    video_file_id: string
    title: string
    description?: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedVoice = {
    type: "voice"
    id: string
    voice_file_id: string
    title: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InlineQueryResultCachedAudio = {
    type: "audio"
    id: string
    audio_file_id: string
    caption?: string
    parse_mode?: string
    caption_entities?: MessageEntity[]
    reply_markup?: InlineKeyboardMarkup
    input_message_content?: InputMessageContent
}

export type InputMessageContent = InputTextMessageContent | InputLocationMessageContent | InputVenueMessageContent | InputContactMessageContent | InputInvoiceMessageContent

export type InputTextMessageContent = {
    message_text: string
    parse_mode?: string
    entities?: MessageEntity[]
    link_preview_options?: LinkPreviewOptions
}

export type InputLocationMessageContent = {
    latitude: number
    longitude: number
    horizontal_accuracy?: number
    live_period?: number
    heading?: number
    proximity_alert_radius?: number
}

export type InputVenueMessageContent = {
    latitude: number
    longitude: number
    title: string
    address: string
    foursquare_id?: string
    foursquare_type?: string
    google_place_id?: string
    google_place_type?: string
}

export type InputContactMessageContent = {
    phone_number: string
    first_name: string
    last_name?: string
    vcard?: string
}

export type InputInvoiceMessageContent = {
    title: string
    description: string
    payload: string
    provider_token?: string
    currency: string
    prices: LabeledPrice[]
    max_tip_amount?: number
    suggested_tip_amounts?: number[]
    provider_data?: string
    photo_url?: string
    photo_size?: number
    photo_width?: number
    photo_height?: number
    need_name?: boolean
    need_phone_number?: boolean
    need_email?: boolean
    need_shipping_address?: boolean
    send_phone_number_to_provider?: boolean
    send_email_to_provider?: boolean
    is_flexible?: boolean
}

export type ChosenInlineResult = {
    result_id: string
    from: User
    location?: Location
    inline_message_id?: string
    query: string
}

export type SentWebAppMessage = {
    inline_message_id?: string
}

export type PreparedInlineMessage = {
    id: string
    expiration_date: number
}

export type LabeledPrice = {
    label: string
    amount: number
}

export type Invoice = {
    title: string
    description: string
    start_parameter: string
    currency: string
    total_amount: number
}

export type ShippingAddress = {
    country_code: string
    state: string
    city: string
    street_line1: string
    street_line2: string
    post_code: string
}

export type OrderInfo = {
    name?: string
    phone_number?: string
    email?: string
    shipping_address?: ShippingAddress
}

export type ShippingOption = {
    id: string
    title: string
    prices: LabeledPrice[]
}

export type SuccessfulPayment = {
    currency: string
    total_amount: number
    invoice_payload: string
    subscription_expiration_date?: number
    is_recurring?: true
    is_first_recurring?: true
    shipping_option_id?: string
    order_info?: OrderInfo
    telegram_payment_charge_id: string
    provider_payment_charge_id: string
}

export type RefundedPayment = {
    currency: string
    total_amount: number
    invoice_payload: string
    telegram_payment_charge_id: string
    provider_payment_charge_id?: string
}

export type ShippingQuery = {
    id: string
    from: User
    invoice_payload: string
    shipping_address: ShippingAddress
}

export type PreCheckoutQuery = {
    id: string
    from: User
    currency: string
    total_amount: number
    invoice_payload: string
    shipping_option_id?: string
    order_info?: OrderInfo
}

export type PaidMediaPurchased = {
    from: User
    paid_media_payload: string
}

export type RevenueWithdrawalState = RevenueWithdrawalStatePending | RevenueWithdrawalStateSucceeded | RevenueWithdrawalStateFailed

export type RevenueWithdrawalStatePending = {
    type: string
}

export type RevenueWithdrawalStateSucceeded = {
    type: string
    date: number
    url: string
}

export type RevenueWithdrawalStateFailed = {
    type: string
}

export type AffiliateInfo = {
    affiliate_user?: User
    affiliate_chat?: Chat
    commission_per_mille: number
    amount: number
    nanostar_amount?: number
}

export type TransactionPartner = TransactionPartnerUser | TransactionPartnerChat | TransactionPartnerAffiliateProgram | TransactionPartnerFragment | TransactionPartnerTelegramAds | TransactionPartnerTelegramApi | TransactionPartnerOther

export type TransactionPartnerUser = {
    type: string
    transaction_type: string
    user: User
    affiliate?: AffiliateInfo
    invoice_payload?: string
    subscription_period?: number
    paid_media?: PaidMedia[]
    paid_media_payload?: string
    gift?: Gift
    premium_subscription_duration?: number
}

export type TransactionPartnerChat = {
    type: string
    chat: Chat
    gift?: Gift
}

export type TransactionPartnerAffiliateProgram = {
    type: string
    sponsor_user?: User
    commission_per_mille: number
}

export type TransactionPartnerFragment = {
    type: string
    withdrawal_state?: RevenueWithdrawalState
}

export type TransactionPartnerTelegramAds = {
    type: string
}

export type TransactionPartnerTelegramApi = {
    type: string
    request_count: number
}

export type TransactionPartnerOther = {
    type: string
}

export type StarTransaction = {
    id: string
    amount: number
    nanostar_amount?: number
    date: number
    source?: TransactionPartner
    receiver?: TransactionPartner
}

export type StarTransactions = {
    transactions: StarTransaction[]
}

export type PassportData = {
    data: EncryptedPassportElement[]
    credentials: EncryptedCredentials
}

export type PassportFile = {
    file_id: string
    file_unique_id: string
    file_size: number
    file_date: number
}

export type EncryptedPassportElement = {
    type: string
    data?: string
    phone_number?: string
    email?: string
    files?: PassportFile[]
    front_side?: PassportFile
    reverse_side?: PassportFile
    selfie?: PassportFile
    translation?: PassportFile[]
    hash: string
}

export type EncryptedCredentials = {
    data: string
    hash: string
    secret: string
}

export type PassportElementError = PassportElementErrorDataField | PassportElementErrorFrontSide | PassportElementErrorReverseSide | PassportElementErrorSelfie | PassportElementErrorFile | PassportElementErrorFiles | PassportElementErrorTranslationFile | PassportElementErrorTranslationFiles | PassportElementErrorUnspecified

export type PassportElementErrorDataField = {
    source: string
    type: string
    field_name: string
    data_hash: string
    message: string
}

export type PassportElementErrorFrontSide = {
    source: string
    type: string
    file_hash: string
    message: string
}

export type PassportElementErrorReverseSide = {
    source: string
    type: string
    file_hash: string
    message: string
}

export type PassportElementErrorSelfie = {
    source: string
    type: string
    file_hash: string
    message: string
}

export type PassportElementErrorFile = {
    source: string
    type: string
    file_hash: string
    message: string
}

export type PassportElementErrorFiles = {
    source: string
    type: string
    file_hashes: string[]
    message: string
}

export type PassportElementErrorTranslationFile = {
    source: string
    type: string
    file_hash: string
    message: string
}

export type PassportElementErrorTranslationFiles = {
    source: string
    type: string
    file_hashes: string[]
    message: string
}

export type PassportElementErrorUnspecified = {
    source: string
    type: string
    element_hash: string
    message: string
}

export type Game = {
    title: string
    description: string
    photo: PhotoSize[]
    text?: string
    text_entities?: MessageEntity[]
    animation?: Animation
}

export type GameHighScore = {
    position: number
    user: User
    score: number
}
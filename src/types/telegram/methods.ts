import { AllowedUpdate, User, Update, InputFile, WebhookInfo, Message, MessageEntity, LinkPreviewOptions, ForceReply, ReplyKeyboardMarkup, ReplyKeyboardRemove, InlineKeyboardMarkup, ReplyParameters, MessageId, InputPaidMedia, InputMedia, InputPollOption, InputChecklist, ReactionType, UserProfilePhotos, ChatPermissions, ChatInviteLink, ChatFullInfo, ChatMember, Sticker, ForumTopic, UserChatBoosts, BusinessConnection, BotCommand, BotCommandScope, BotName, BotDescription, BotShortDescription, MenuButton, ChatAdministratorRights, Poll, Gifts, InputProfilePhoto, AcceptedGiftTypes, StarAmount, OwnedGift, Story, InputStoryContent, StoryArea, StickerSet, InputSticker, MaskPosition, InlineQueryResult, InlineQueryResultsButton, SentWebAppMessage, PreparedInlineMessage, LabeledPrice, ShippingOption, StarTransactions, PassportElementError } from "@/types/telegram"

export type TelegramMethodMap = {
    getMe: {
        return: User
    }
    getUpdates: {
        return: Update[]
        args: {
            offset?: number
            limit?: number
            timeout?: number
            allowed_updates?: AllowedUpdate[]
        }
    }
    setWebhook: {
        return: boolean
        args: {
            url: string
            certificate?: InputFile
            ip_address?: string
            max_connections?: number
            allowed_updates?: AllowedUpdate[]
            drop_pending_updates?: boolean
            secret_token?: string
        }
    }
    getWebhookInfo: {
        return: WebhookInfo
    }
    deleteWebhook: {
        return: boolean
        args: {
            drop_pending_updates?: boolean
        }
    }
    logOut: {
        return: boolean
    }
    close: {
        return: boolean
    }
    sendMessage: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            text: string
            parse_mode?: string
            entities?: MessageEntity[]
            link_preview_options?: LinkPreviewOptions
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    forwardMessage: {
        return: Message
        args: {
            chat_id: number | string
            message_thread_id?: number
            from_chat_id: number | string
            video_start_timestamp?: number
            disable_notification?: boolean
            protect_content?: boolean
            message_id: number
        }
    }
    forwardMessages: {
        return: MessageId[]
        args: {
            chat_id: number | string
            message_thread_id?: number
            from_chat_id: number | string
            message_ids: number[]
            disable_notification?: boolean
            protect_content?: boolean
        }
    }
    copyMessage: {
        return: MessageId
        args: {
            chat_id: number | string
            message_thread_id?: number
            from_chat_id: number | string
            message_id: number
            video_start_timestamp?: number
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            show_caption_above_media?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    copyMessages: {
        return: MessageId[]
        args: {
            chat_id: number | string
            message_thread_id?: number
            from_chat_id: number | string
            message_ids: number[]
            disable_notification?: boolean
            protect_content?: boolean
            remove_caption?: boolean
        }
    }
    sendPhoto: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            photo: InputFile | string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            show_caption_above_media?: boolean
            has_spoiler?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendAudio: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            audio: InputFile | string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            duration?: number
            performer?: string
            title?: string
            thumbnail?: InputFile | string
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendDocument: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            document: InputFile | string
            thumbnail?: InputFile | string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            disable_content_type_detection?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendVideo: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            video: InputFile | string
            duration?: number
            width?: number
            height?: number
            thumbnail?: InputFile | string
            cover?: InputFile | string
            start_timestamp?: number
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            show_caption_above_media?: boolean
            has_spoiler?: boolean
            supports_streaming?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendAnimation: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            animation: InputFile | string
            duration?: number
            width?: number
            height?: number
            thumbnail?: InputFile | string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            show_caption_above_media?: boolean
            has_spoiler?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendVoice: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            voice: InputFile | string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            duration?: number
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendVideoNote: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            video_note: InputFile | string
            duration?: number
            length?: number
            thumbnail?: InputFile | string
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendPaidMedia: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            star_count: number
            media: InputPaidMedia[]
            payload?: string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            show_caption_above_media?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendMediaGroup: {
        return: Message[]
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            media: InputMedia[]
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
        }
    }
    sendLocation: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            latitude: number
            longitude: number
            horizontal_accuracy?: number
            live_period?: number
            heading?: number
            proximity_alert_radius?: number
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendVenue: {
        return: Message,
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            latitude: number
            longitude: number
            title: string
            address: string
            foursquare_id?: string
            foursquare_type?: string
            google_place_id?: string
            google_place_type?: string
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendContact: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            phone_number: string
            first_name: string
            last_name?: string
            vcard?: string
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendPoll: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            question: string
            question_parse_mode?: string
            question_entities?: MessageEntity[]
            options: InputPollOption[]
            is_anonymous?: boolean
            type?: string
            allows_multiple_answers?: boolean
            correct_option_id?: number
            explanation?: string
            explanation_parse_mode?: string
            explanation_entities?: MessageEntity[]
            open_period?: number
            close_date?: number
            is_closed?: boolean
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendChecklist: {
        return: Message
        args: {
            business_connection_id: string
            chat_id: number
            checklist: InputChecklist
            disable_notification?: boolean
            protect_content?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup
        }
    }
    sendDice: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            emoji?: string
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    sendChatAction: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            action: string
        }
    }
    setMessageReaction: {
        return: boolean
        args: {
            chat_id: number | string
            message_id: number
            reaction?: ReactionType[]
            is_big?: boolean
        }
    }
    getUserProfilePhotos: {
        return: UserProfilePhotos
        args: {
            user_id: number
            offset?: number
            limit?: number
        }
    }
    setUserEmojiStatus: {
        return: boolean
        args: {
            user_id: number
            emoji_status_custom_emoji_id?: string
            emoji_status_expiration_date?: number
        }
    }
    getFile: {
        return: File
        args: {
            file_id: string
        }
    }
    banChatMember: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
            until_date?: number
            revoke_messages?: boolean
        }
    }
    unbanChatMember: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
            only_if_banned?: boolean
        }
    }
    restrictChatMember: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
            permissions: ChatPermissions
            use_independent_chat_permissions?: boolean
            until_date?: number
        }
    }
    promoteChatMember: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
            is_anonymous?: boolean
            can_manage_chat?: boolean
            can_delete_messages?: boolean
            can_manage_video_chats?: boolean
            can_restrict_members?: boolean
            can_promote_members?: boolean
            can_change_info?: boolean
            can_invite_users?: boolean
            can_post_stories?: boolean
            can_edit_stories?: boolean
            can_delete_stories?: boolean
            can_post_messages?: boolean
            can_edit_messages?: boolean
            can_pin_messages?: boolean
            can_manage_topics?: boolean
        }
    }
    setChatAdministratorCustomTitle: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
            custom_title: string
        }
    }
    banChatSenderChat: {
        return: boolean
        args: {
            chat_id: number | string
            sender_chat_id: number
        }
    }
    unbanChatSenderChat: {
        return: boolean
        args: {
            chat_id: number | string
            sender_chat_id: number
        }
    }
    setChatPermissions: {
        return: boolean
        args: {
            chat_id: number | string
            permissions: ChatPermissions
            use_independent_chat_permissions?: boolean
        }
    }
    exportChatInviteLink: {
        return: String
        args: {
            chat_id: number | string
        }
    }
    createChatInviteLink: {
        return: ChatInviteLink
        args: {
            chat_id: number | string
            name?: string
            expire_date?: number
            member_limit?: number
            creates_join_request?: boolean
        }
    }
    editChatInviteLink: {
        return: ChatInviteLink
        args: {
            chat_id: number | string
            invite_link: string
            name?: string
            expire_date?: number
            member_limit?: number
            creates_join_request?: boolean
        }
    }
    createChatSubscriptionInviteLink: {
        return: ChatInviteLink
        args: {
            chat_id: number | string
            name?: string
            subscription_period: number
            subscription_price: number
        }
    }
    editChatSubscriptionInviteLink: {
        return: ChatInviteLink
        args: {
            chat_id: number | string
            invite_link: string
            name?: string
        }
    }
    revokeChatInviteLink: {
        return: ChatInviteLink
        args: {
            chat_id: number | string
            invite_link: string
        }
    }
    approveChatJoinRequest: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
        }
    }
    declineChatJoinRequest: {
        return: boolean
        args: {
            chat_id: number | string
            user_id: number
        }
    }
    setChatPhoto: {
        return: boolean
        args: {
            chat_id: number | string
            photo: InputFile
        }
    }
    deleteChatPhoto: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    setChatTitle: {
        return: boolean
        args: {
            chat_id: number | string
            title: string
        }
    }
    setChatDescription: {
        return: boolean
        args: {
            chat_id: number | string
            description?: string
        }
    }
    pinChatMessage: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_id: number
            disable_notification?: boolean
        }
    }
    unpinChatMessage: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_id?: number
        }
    }
    unpinAllChatMessages: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    leaveChat: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    getChat: {
        return: ChatFullInfo
        args: {
            chat_id: number | string
        }
    }
    getChatAdministrators: {
        return: ChatMember[]
        args: {
            chat_id: number | string
        }
    }
    getChatMemberCount: {
        return: number
        args: {
            chat_id: number | string
        }
    }

    getChatMember: {
        return: ChatMember
        args: {
            chat_id: number | string
            user_id: number
        }
    }
    setChatStickerSet: {
        return: boolean
        args: {
            chat_id: number | string
            sticker_set_name: string
        }
    }
    deleteChatStickerSet: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    getForumTopicIconStickers: {
        return: Sticker[]
    }
    createForumTopic: {
        return: ForumTopic
        args: {
            chat_id: number | string
            name: string
            icon_color?: number
            icon_custom_emoji_id?: string
        }
    }
    editForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
            message_thread_id: number
            name?: string
            icon_custom_emoji_id?: string
        }
    }
    closeForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
            message_thread_id: number
        }
    }
    reopenForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
            message_thread_id: number
        }
    }
    deleteForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
            message_thread_id: number
        }
    }
    unpinAllForumTopicMessages: {
        return: boolean
        args: {
            chat_id: number | string
            message_thread_id: number
        }
    }
    editGeneralForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
            name: string
        }
    }
    closeGeneralForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    reopenGeneralForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    hideGeneralForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    unhideGeneralForumTopic: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    unpinAllGeneralForumTopicMessages: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    answerCallbackQuery: {
        return: boolean
        args: {
            callback_query_id: string
            text?: string
            show_alert?: boolean
            url?: string
            cache_time?: number
        }
    }
    getUserChatBoosts: {
        return: UserChatBoosts
        args: {
            chat_id: number | string
            user_id: number
        }
    }
    getBusinessConnection: {
        return: BusinessConnection
        args: {
            business_connection_id: string
        }
    }
    setMyCommands: {
        return: boolean
        args: {
            commands: BotCommand[]
            scope?: BotCommandScope
            language_code?: string
        }
    }
    deleteMyCommands: {
        return: boolean
        args: {
            scope?: BotCommandScope
            language_code?: string
        }
    }
    getMyCommands: {
        return: BotCommand[]
        args: {
            scope?: BotCommandScope
            language_code?: string
        }
    }
    setMyName: {
        return: boolean
        args: {
            name?: string
            language_code?: string
        }
    }
    getMyName: {
        return: BotName
        args: {
            language_code?: string
        }
    }
    setMyDescription: {
        return: boolean
        args: {
            description?: string
            language_code?: string
        }
    }
    getMyDescription: {
        return: BotDescription
        args: {
            language_code?: string
        }
    }
    setMyShortDescription: {
        return: boolean
        args: {
            short_description?: string
            language_code?: string
        }
    }
    getMyShortDescription: {
        return: BotShortDescription
        args: {
            language_code?: string
        }
    }
    setChatMenuButton: {
        return: boolean
        args: {
            chat_id?: number
            menu_button?: MenuButton
        }
    }
    getChatMenuButton: {
        return: MenuButton
        args: {
            chat_id?: number
        }
    }
    setMyDefaultAdministratorRights: {
        return: boolean
        args: {
            rights?: ChatAdministratorRights
            for_channels?: boolean
        }
    }
    getMyDefaultAdministratorRights: {
        return: ChatAdministratorRights
        args: {
            for_channels?: boolean
        }
    }
    editMessageText: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            text: string
            parse_mode?: string
            entities?: MessageEntity[]
            link_preview_options?: LinkPreviewOptions
            reply_markup?: InlineKeyboardMarkup
        }
    }
    editMessageCaption: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            show_caption_above_media?: boolean
            reply_markup?: InlineKeyboardMarkup
        }
    }
    editMessageMedia: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            media: InputMedia
            reply_markup?: InlineKeyboardMarkup
        }
    }
    editMessageLiveLocation: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            latitude: number
            longitude: number
            live_period?: number
            horizontal_accuracy?: number
            heading?: number
            proximity_alert_radius?: number
            reply_markup?: InlineKeyboardMarkup
        }
    }
    stopMessageLiveLocation: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            reply_markup?: InlineKeyboardMarkup
        }
    }
    editMessageChecklist: {
        return: Message
        args: {
            business_connection_id: string
            chat_id: number
            message_id: number
            checklist: InputChecklist
            reply_markup?: InlineKeyboardMarkup
        }
    }
    editMessageReplyMarkup: {
        return: boolean
        args: {
            business_connection_id?: string
            chat_id?: number | string
            message_id?: number
            inline_message_id?: string
            reply_markup?: InlineKeyboardMarkup
        }
    }
    stopPoll: {
        return: Poll
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_id: number
            reply_markup?: InlineKeyboardMarkup
        }
    }
    deleteMessage: {
        return: boolean
        args: {
            chat_id: number | string
            message_id: number
        }
    }
    deleteMessages: {
        return: boolean
        args: {
            chat_id: number | string
            message_ids: number[]
        }
    }
    getAvailableGifts: {
        return: Gifts
    }
    sendGift: {
        return: boolean
        args: {
            user_id?: number
            chat_id?: number | string
            gift_id: string
            pay_for_upgrade?: boolean
            text?: string
            text_parse_mode?: string
            text_entities?: MessageEntity[]
        }
    }
    giftPremiumSubscription: {
        return: boolean
        args: {
            user_id: number
            month_count: number
            star_count: number
            text?: string
            text_parse_mode?: string
            text_entities?: MessageEntity[]
        }
    }
    verifyUser: {
        return: boolean
        args: {
            user_id: number
            custom_description?: string
        }
    }
    verifyChat: {
        return: boolean
        args: {
            chat_id: number | string
            custom_description?: string
        }
    }
    removeUserVerification: {
        return: boolean
        args: {
            user_id: number
        }
    }
    removeChatVerification: {
        return: boolean
        args: {
            chat_id: number | string
        }
    }
    readBusinessMessage: {
        return: boolean
        args: {
            business_connection_id: string
            chat_id: number
            message_id: number
        }
    }
    deleteBusinessMessages: {
        return: boolean
        args: {
            business_connection_id: string
            message_ids: number[]
        }
    }
    setBusinessAccountName: {
        return: boolean
        args: {
            business_connection_id: string
            first_name: string
            last_name?: string
        }
    }
    setBusinessAccountUsername: {
        return: boolean
        args: {
            business_connection_id: string
            username?: string
        }
    }
    setBusinessAccountBio: {
        return: boolean
        args: {
            business_connection_id: string
            bio?: string
        }
    }
    setBusinessAccountProfilePhoto: {
        return: boolean
        args: {
            business_connection_id: string
            photo: InputProfilePhoto
            is_public?: boolean
        }
    }
    removeBusinessAccountProfilePhoto: {
        return: boolean
        args: {
            business_connection_id: string
            is_public?: boolean
        }
    }
    setBusinessAccountGiftSettings: {
        return: boolean
        args: {
            business_connection_id: string
            show_gift_button: boolean
            accepted_gift_types: AcceptedGiftTypes
        }
    }
    getBusinessAccountStarBalance: {
        return: StarAmount
        args: {
            business_connection_id: string
        }
    }
    transferBusinessAccountStars: {
        return: boolean
        args: {
            business_connection_id: string
            star_count: number
        }
    }
    getBusinessAccountGifts: {
        return: OwnedGift
        args: {
            business_connection_id: string
            exclude_unsaved?: boolean
            exclude_saved?: boolean
            exclude_unlimited?: boolean
            exclude_limited?: boolean
            exclude_unique?: boolean
            sort_by_price?: boolean
            offset?: string
            limit?: number
        }
    }
    convertGiftToStars: {
        return: boolean
        args: {
            business_connection_id: string
            owned_gift_id: string
        }
    }
    upgradeGift: {
        return: boolean
        args: {
            business_connection_id: string
            owned_gift_id: string
            keep_original_details?: boolean
            star_count?: number
        }
    }
    transferGift: {
        return: boolean
        args: {
            business_connection_id: string
            owned_gift_id: string
            new_owner_chat_id: number
            star_count?: number
        }
    }
    postStory: {
        return: Story
        args: {
            business_connection_id: string
            content: InputStoryContent
            active_period: number
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            areas?: StoryArea[]
            post_to_chat_page?: boolean
            protect_content?: boolean
        }
    }
    editStory: {
        return: Story
        args: {
            business_connection_id: string
            story_id: number
            content: InputStoryContent
            caption?: string
            parse_mode?: string
            caption_entities?: MessageEntity[]
            areas?: StoryArea[]
        }
    }
    deleteStory: {
        return: boolean
        args: {
            business_connection_id: string
            story_id: number
        }
    }
    sendSticker: {
        return: Message
        args: {
            business_connection_id?: string
            chat_id: number | string
            message_thread_id?: number
            sticker: InputFile | string
            emoji?: string
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
        }
    }
    getStickerSet: {
        return: StickerSet
        args: {
            name: string
        }
    }
    getCustomEmojiStickers: {
        return: Sticker[]
        args: {
            custom_emoji_ids: string[]
        }
    }
    uploadStickerFile: {
        return: File
        args: {
            user_id: number
            sticker: InputFile
            sticker_format: string
        }
    }
    createNewStickerSet: {
        return: boolean
        args: {
            user_id: number
            name: string
            title: string
            stickers: InputSticker[]
            sticker_type?: string
            needs_repainting?: boolean
        }
    }
    addStickerToSet: {
        return: boolean
        args: {
            user_id: number
            name: string
            sticker: InputSticker
        }
    }
    setStickerPositionInSet: {
        return: boolean
        args: {
            sticker: string
            position: number
        }
    }
    deleteStickerFromSet: {
        return: boolean
        args: {
            sticker: string
        }
    }
    replaceStickerInSet: {
        return: boolean
        args: {
            user_id: number
            name: string
            old_sticker: string
            sticker: InputSticker
        }
    }
    setStickerEmojiList: {
        return: boolean
        args: {
            sticker: string
            emoji_list: string[]
        }
    }
    setStickerKeywords: {
        return: boolean
        args: {
            sticker: string
            keywords?: string[]
        }
    }
    setStickerMaskPosition: {
        return: boolean
        args: {
            sticker: string
            mask_position?: MaskPosition
        }
    }
    setStickerSetTitle: {
        return: boolean
        args: {
            name: string
            title: string
        }
    }
    setStickerSetThumbnail: {
        return: boolean
        args: {
            name: string
            user_id: number
            thumbnail?: InputFile | string
            format: string
        }
    }
    setCustomEmojiStickerSetThumbnail: {
        return: boolean
        args: {
            name: string
            custom_emoji_id?: string
        }
    }
    deleteStickerSet: {
        return: boolean
        args: {
            name: string
        }
    }
    answerInlineQuery: {
        return: boolean
        args: {
            inline_query_id: string
            results: InlineQueryResult[]
            cache_time?: number
            is_personal?: boolean
            next_offset?: string
            button?: InlineQueryResultsButton
        }
    }
    answerWebAppQuery: {
        return: SentWebAppMessage
        args: {
            web_app_query_id: string
            result: InlineQueryResult
        }
    }
    savePreparedInlineMessage: {
        return: PreparedInlineMessage
        args: {
            user_id: number
            result: InlineQueryResult
            allow_user_chats?: boolean
            allow_bot_chats?: boolean
            allow_group_chats?: boolean
            allow_channel_chats?: boolean
        }
    }
    sendInvoice: {
        return: Message
        args: {
            chat_id: number | string
            message_thread_id?: number
            title: string
            description: string
            payload: string
            provider_token?: string
            currency: string
            prices: LabeledPrice[]
            max_tip_amount?: number
            suggested_tip_amounts?: number[]
            start_parameter?: string
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
            disable_notification?: boolean
            protect_content?: boolean
            allow_paid_broadcast?: boolean
            message_effect_id?: string
            reply_parameters?: ReplyParameters
            reply_markup?: InlineKeyboardMarkup
        }
    }
    createInvoiceLink: {
        return: String
        args: {
            business_connection_id?: string
            title: string
            description: string
            payload: string
            provider_token?: string
            currency: string
            prices: LabeledPrice[]
            subscription_period?: number
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
    }
    answerShippingQuery: {
        return: boolean
        args: {
            shipping_query_id: string
            ok: boolean
            shipping_options?: ShippingOption[]
            error_message?: string
        }
    }
    answerPreCheckoutQuery: {
        return: boolean
        args: {
            pre_checkout_query_id: string
            ok: boolean
            error_message?: string
        }
    }
    getMyStarBalance: {
        return: StarAmount
    }
    getStarTransactions: {
        return: StarTransactions
        args: {
            offset?: number
            limit?: number
        }
    }
    refundStarPayment: {
        return: boolean
        args: {
            user_id: number
            telegram_payment_charge_id: string
        }
    }
    editUserStarSubscription: {
        return: boolean
        args: {
            user_id: number
            telegram_payment_charge_id: string
            is_canceled: boolean
        }
    }
    setPassportDataErrors: {
        return: boolean
        args: {
            user_id: number
            errors: PassportElementError[]
        }
    }
}
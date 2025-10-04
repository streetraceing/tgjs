import { ClientOptions } from '@/types/client';

export const tokenMinimalLength = 40;

export const apiUrl = `https://api.telegram.org/`;

export const defaultBotOptions = {
    logger: {
        level: 'info',
    },
    updates: {
        autostart: true,
        method: 'longpoll',
        longpoll: {
            timeout: 30,
        },
        webhook: {
            port: 3000,
            path: '/webhook',
        },
    },
} as unknown as ClientOptions;

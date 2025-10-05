import chalk from 'chalk';
import { LogLevel, LogModule } from '@/lib/logger';
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

export const loggerLevelPriority = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    off: 4,
};

export const LogLevels = ['off', 'debug', 'info', 'warn', 'error'] as const;

export const levelColorMap: Record<LogLevel, (msg: string) => string> = {
    off: () => '',
    debug: chalk.hex('#9E9E9E'),
    info: chalk.hex('#03A9F4'),
    warn: chalk.hex('#FFC107'),
    error: chalk.hex('#F44336'),
};

export const moduleColorMap: Record<LogModule, (text: string) => string> = {
    bot: chalk.hex('#5D5FEF'),
    updates: chalk.hex('#90ee90'),
};

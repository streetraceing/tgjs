import chalk from 'chalk';

import { capitalizeString } from '@/lib/util';

export const LogLevels = ['off', 'debug', 'info', 'warn', 'error'] as const;

export type LogLevel = (typeof LogLevels)[number];

export type LogModule = 'bot' | 'updates';

export type LoggerParams = {
    level?: LogLevel;
};

export type LogParams = {
    text: string;
    module: LogModule;
};

type ChalkFn = (msg: string) => string;

const levelColorMap: Record<LogLevel, (msg: string) => string> = {
    off: () => '',
    debug: chalk.hex('#9E9E9E'),
    info: chalk.hex('#03A9F4'),
    warn: chalk.hex('#FFC107'),
    error: chalk.hex('#F44336'),
};

const levelPriority = { debug: 0, info: 1, warn: 2, error: 3, off: 4 };

const moduleColorMap: Record<LogModule, (text: string) => string> = {
    bot: chalk.hex('#5D5FEF'),
    updates: chalk.hex('#90ee90'),
};

export class Logger {
    private params: LoggerParams;

    constructor(params: LoggerParams) {
        this.params = params;
    }

    get level() {
        return this.params.level!;
    }

    set level(level: LogLevel) {
        this.params.level = level;
    }

    static secureTokens(text: string): string {
        return text.replace(/bot[0-9]+:[a-zA-Z0-9_-]+/g, 'bot...');
    }

    static getTimestamp(): string {
        return new Date().toLocaleTimeString('ru-RU', { hour12: false });
    }

    private static applyChalkTag(tag: string, content: string): string {
        const colorFn = (chalk as unknown as Record<string, ChalkFn>)[tag];
        return typeof colorFn === 'function' ? colorFn(content) : content;
    }

    private static applyHexTag(tag: string, content: string): string {
        const hex = tag.match(/^#([0-9a-fA-F]{6})$/)?.[1];
        return hex ? chalk.hex(hex)(content) : content;
    }

    private static applyBgHexTag(tag: string, content: string): string {
        const hex = tag.match(/^bg#([0-9a-fA-F]{6})$/)?.[1];
        return hex ? chalk.bgHex(hex)(content) : content;
    }

    private static applyStyles(message: string): string {
        return message
            .replace(
                /<([a-zA-Z]+)>(.*?)<\/\1>/gs,
                (_, tag: string, content: string) => {
                    return this.applyChalkTag(tag, content);
                },
            )
            .replace(
                /<(#[0-9a-fA-F]{6})>(.*?)<\/\1>/g,
                (_, tag: string, content: string) => {
                    return this.applyHexTag(tag, content);
                },
            )
            .replace(
                /<bg#([0-9a-fA-F]{6})>(.*?)<\/bg#\1>/g,
                (_, tag: string, content: string) => {
                    return this.applyBgHexTag(`bg#${tag}`, content);
                },
            );
    }

    private shouldLog(level: LogLevel): boolean {
        return levelPriority[level] >= levelPriority[this.params.level!];
    }

    private log(level: LogLevel, { text, module }: LogParams) {
        if (!this.shouldLog(level)) return;

        const prefix = levelColorMap[level](
            `[${Logger.getTimestamp()} - ${level.toUpperCase()}]`,
        );
        const suffix = moduleColorMap[module](`[${capitalizeString(module)}]`);
        const message = Logger.applyStyles(Logger.secureTokens(text));

        process.stdout.write(`${prefix} ${suffix} ${message}\n`);
    }

    debug(params: LogParams) {
        this.log('debug', params);
    }

    info(params: LogParams) {
        this.log('info', params);
    }

    warn(params: LogParams) {
        this.log('warn', params);
    }

    error(params: LogParams) {
        this.log('error', params);
    }
}

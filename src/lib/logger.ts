import chalk from 'chalk';

import { capitalizeString, getTimestamp, secureTokens } from '@/lib/util';
import {
    levelColorMap,
    loggerLevelPriority,
    LogLevels,
    moduleColorMap,
} from '@/lib/constants';

export type LogLevel = (typeof LogLevels)[number];

export type LogModule = 'bot' | 'updates';

export type LoggerParams = {
    level?: LogLevel;
};

export type LogParams = {
    text: string;
    module: LogModule;
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

    private static applyChalkTag(tag: string, content: string): string {
        const colorFn = (
            chalk as unknown as Record<string, (msg: string) => string>
        )[tag];
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
        return (
            loggerLevelPriority[level] >=
            loggerLevelPriority[this.params.level!]
        );
    }

    private log(level: LogLevel, { text, module }: LogParams) {
        if (!this.shouldLog(level)) return;

        const prefix = levelColorMap[level](
            `[${getTimestamp()} - ${level.toUpperCase()}]`,
        );
        const suffix = moduleColorMap[module](`[${capitalizeString(module)}]`);
        const message = Logger.applyStyles(secureTokens(text));

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

import FormData from 'form-data';
import fs from 'fs';
import { DeepPartial } from '@/types/util';

export function isInputFile(value: any): boolean {
    return (
        Buffer.isBuffer(value) ||
        value instanceof fs.ReadStream ||
        (typeof value === 'string' &&
            fs.existsSync(value) &&
            fs.statSync(value).isFile())
    );
}

export function toFormData(data: Record<string, any>): FormData {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
        if (isInputFile(value)) {
            if (typeof value === 'string') {
                form.append(key, fs.createReadStream(value));
            } else {
                form.append(key, value, { filename: `${key}.bin` });
            }
        } else {
            form.append(key, value);
        }
    }

    return form;
}

export function joinUrl(
    ...parts: Array<string | number | null | undefined>
): string {
    let proto = '';
    const res: string[] = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part == null) continue;

        let str = String(part);

        if (i === 0) {
            const match = str.match(/^([a-z][a-z0-9+.-]*:\/\/)/i);
            if (match) {
                proto = match[1];
                str = str.slice(proto.length);
            }
        } else {
            if (/^[a-z][a-z0-9+.-]*:\/\//i.test(str)) {
                str = str.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '');
            }
        }

        str = str.replace(/^\/+|\/+$/g, '');
        if (str) res.push(str);
    }

    return proto + res.join('/');
}

export function deepMerge<T>(target: DeepPartial<T>, source: Partial<T>): T;
export function deepMerge<T>(target: DeepPartial<T>, source: DeepPartial<T>): T;
export function deepMerge<T>(target: Partial<T>, source: DeepPartial<T>): T;
export function deepMerge<T>(target: Partial<T>, source: Partial<T>): T {
    const output: any = { ...target };

    for (const key in source) {
        const value = source[key];
        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            typeof output[key] === 'object'
        ) {
            output[key] = deepMerge(output[key], value);
        } else if (value !== undefined) {
            output[key] = value;
        }
    }

    return output;
}

export function capitalizeString(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function secureTokens(text: string): string {
    return text.replace(/bot[0-9]+:[a-zA-Z0-9_-]+/g, 'bot...');
}

export function getTimestamp(): string {
    return new Date().toLocaleTimeString('ru-RU', { hour12: false });
}

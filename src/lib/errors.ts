import { Logger } from '@/lib/logger';

export class RequestError extends Error {
    public override name = 'RequestError';

    constructor(
        public readonly url: string,
        public readonly code: number,
        public readonly description: string,
    ) {
        super(`Request failed with code ${code} | ${description}`);

        this.code = code;
        this.description = description;
        this.url = Logger.secureTokens(url);

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class DirectBotConstructorError extends Error {
    public override name = 'DirectBotConstructorError';

    constructor() {
        super(
            'Direct constructor call is not allowed. Use Bot.create(...) instead.',
        );

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class IncorrectBotOptions extends Error {
    public override name = 'IncorrectBotOptions';

    constructor(
        public readonly param: string,
        public readonly value: any,
        public readonly description?: string,
    ) {
        super(
            `Incorrect "${param}" value "${value}" when initializing Bot class`,
        );

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

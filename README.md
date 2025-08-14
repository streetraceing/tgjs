# tgjs

*TypeScript library for interacting with the Telegram Bot API*

[![npm version](https://img.shields.io/npm/v/@streetraceing/tgjs)](https://www.npmjs.com/package/@streetraceing/tgjs)
[![npm](https://img.shields.io/npm/dt/@streetraceing/tgjs)](https://www.npmjs.com/package/@streetraceing/tgjs)
[![license](https://img.shields.io/npm/l/@streetraceing/tgjs)](https://github.com/streetraceing/tgjs/blob/master/LICENSE)

---

## Installation

```bash
npm install @streetraceing/tgjs
```

---

## Quick start

```ts
import { Bot } from "@streetraceing/tgjs";

const bot = new Bot({ token: process.env.TOKEN! });

bot.on("message", ctx => {
    ctx.reply(`You write: '${ctx.raw.text || "nothing"}'`);
});
```

--- 

## ClientOptions

### Structure

```ts
export type ClientOptions = {
    token: string
    logger?: LoggerParams
    updates?: ClientUpdates<LongpollOptions, WebhookOptions>
}
```

### Fields

`token` (string, required)

Your bot token from BotFather.

---

`logger` (optional)

Logging configuration (LoggerParams structure).

---

`updates` (optional)

Specifies how the bot receives updates: longpoll or webhook.

#### Option 1 — Longpoll

```ts
{
    updates: {
        method?: "longpoll"        // optional, defaults to longpoll
        autostart?: boolean        // start receiving updates automatically
        longpoll?: LongpollOptions // getUpdates parameters
    }
}
```

---

#### Option 2 — Webhook

```ts
{
    updates: {
        method: "webhook",        // required
        autostart?: boolean,      // start receiving updates automatically
        webhook: {
            domain: string,       // public domain for Telegram webhook
            port?: number,        // local server port
            path?: string         // path, defaults to "/webhook"
        }
    }
}
```
import { BotService } from './bot.service';

require('dotenv').config()

const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not set in .env")

export const bot = new BotService(token)

console.log('🤖 Telegram Bot started');
import { BotService } from './bot.service';

require('dotenv').config()

const token = "7747826892:AAFc_B8xKWojXKLMzCFta0sUrPsDS38HcUE"
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not set in .env")

export const bot = new BotService(token)

console.log('🤖 Telegram Bot started');
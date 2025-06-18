import { BotService } from './bot.service';

let botService: BotService | null = null;

export function initializeBot() {
//     console.log(process.env)
//   if (!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN) {
//     console.warn('TELEGRAM_BOT_TOKEN is not set. Telegram bot will not start.');
//     return null;
//   }

  if (!botService) {
    try {
      botService = new BotService("7747826892:AAFc_B8xKWojXKLMzCFta0sUrPsDS38HcUE");
    } catch (error) {
      console.error('Failed to initialize Telegram bot:', error);
    }
  }

  return botService;
}

export const bot = initializeBot();
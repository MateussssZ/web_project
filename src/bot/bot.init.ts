import { BotService } from './bot.service';

let botService: BotService | null = null;

export function initializeBot() {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN is not set. Telegram bot will not start.');
    return null;
  }

  if (!botService) {
    try {
      botService = new BotService(process.env.TELEGRAM_BOT_TOKEN);
    } catch (error) {
      console.error('Failed to initialize Telegram bot:', error);
    }
  }

  return botService;
}

export const bot = initializeBot();
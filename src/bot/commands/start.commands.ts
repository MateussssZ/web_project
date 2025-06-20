import { Bot } from "grammy";
import { BOT_MESSAGES } from "../constants/bot.constants";

export const registerStartCommand = (bot: Bot) => {
  bot.command('start', async (ctx) => {
    try {
      await ctx.reply(BOT_MESSAGES.welcome, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { 
                text: '🌐 Open Web App', 
                url: process.env.NEXT_PUBLIC_WEB_APP_URL || 'https://example.com' 
              }
            ]
          ]
        }
      });
      
      // Сохраняем chatId для будущих уведомлений
      if (ctx.chat?.id) {
        (bot as any).activeChats = (bot as any).activeChats || new Set();
        (bot as any).activeChats.add(ctx.chat.id);
      }
    } catch (error) {
      console.error('Error in start command:', error);
      await ctx.reply(BOT_MESSAGES.error);
    }
  });
};
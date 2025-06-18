import { Bot } from "grammy";
import { registerStartCommand } from "./commands/start.commands";
import { BOT_MESSAGES } from "./constants/bot.constants";

export class BotService {
  private bot: Bot;
  private activeChats: Set<number> = new Set();

  constructor(token: string) {
    if (!token) {
      throw new Error('Telegram bot token is required');
    }

    this.bot = new Bot(token);
    this.bot.start = this.bot.start.bind(this.bot);
    
    // Добавляем chats в экземпляр бота для доступа из команд
    (this.bot as any).activeChats = this.activeChats;

    this.registerCommands();
    this.start();
  }

  private registerCommands() {
    registerStartCommand(this.bot);
  }

  private start() {
    this.bot.start();
    console.log('Bot is running and will notify all users who started the chat');
  }

  public async notifyNewArticle(notification: {
    title: string;
    createdAt: Date;
    url: string;
  }) {
    if (this.activeChats.size === 0) return;

    const message = BOT_MESSAGES.newArticle(notification);
    const errors: number[] = [];

    for (const chatId of this.activeChats) {
      try {
        await this.bot.api.sendMessage(chatId, message, {
          parse_mode: 'Markdown',
        });
      } catch (error) {
        console.error(`Failed to notify chat ${chatId}:`, error);
        errors.push(chatId);
      }
    }

    // Удаляем чаты, где отправка не удалась
    errors.forEach(chatId => this.activeChats.delete(chatId));
  }
}
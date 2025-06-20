import { NextApiRequest, NextApiResponse } from 'next';
import { BotService } from '../../lib/bot.service';

require('dotenv').config()


let botInstance: BotService | null = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!botInstance) {
    const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not set in .env")
    botInstance = new BotService(process.env.TELEGRAM_BOT_TOKEN!);
    console.log('🤖 Telegram Bot started');
  }

  try {
    await botInstance.notifyNewArticle({
        title: req.body.title,
        createdAt:req.body.createdAt,
        url:req.body.url,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Notification failed' });
  }
}
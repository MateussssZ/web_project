import http from 'http';
import next from 'next';
import {BotService} from './lib/bot.service';

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3003', 10);

// Инициализация Next.js приложения
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Главная функция запуска
async function main() {
  const bot = new BotService("7747826892:AAFc_B8xKWojXKLMzCFta0sUrPsDS38HcUE");

  await app.prepare();

  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url === '/notify' && req.method === 'POST') {
        await handleNotify(req, res, bot);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}

main().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});

async function handleNotify(req: http.IncomingMessage, res: http.ServerResponse, bot: BotService): Promise<void> {
    try {
      const body = await parseRequestBody(req);
      const { title, createdAt , url} = body;

      // Отправляем уведомление через бота
      await bot.notifyNewArticle({
        title,
        createdAt,
        url
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (error) {
      console.error('Error handling notification:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  }

function parseRequestBody(req: http.IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error('Invalid JSON'));
        }
      });
      req.on('error', reject);
    });
  }



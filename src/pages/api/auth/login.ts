import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../db/index';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const db = await getDb();
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Примитивная cookie-сессия (для продакшена используйте JWT или iron-session)
  res.setHeader('Set-Cookie', serialize('user', String(user.id), { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 }));
  res.status(200).json({ message: 'Logged in' });
}
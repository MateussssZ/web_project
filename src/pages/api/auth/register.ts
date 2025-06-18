import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../db/index';
import bcrypt from 'bcryptjs';

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
  const existing = await db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (existing) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  const password_hash = await bcrypt.hash(password, 10);
  await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, password_hash]);
  res.status(201).json({ message: 'User registered' });
}
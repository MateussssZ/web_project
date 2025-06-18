import { Database } from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './database.sqlite',
  driver: Database
});

export const getDb = async () => {
  return dbPromise;
};

export const initializeDb = async () => {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
};

export const createArticle = async (title: string, content: string, userId: number) => {
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, userId]
  );
  return result.lastID;
};

export const getArticles = async () => {
  const db = await getDb();
  return db.all('SELECT * FROM articles');
};

export const getArticleById = async (id: number) => {
  const db = await getDb();
  return db.get('SELECT * FROM articles WHERE id = ?', [id]);
};

export const updateArticle = async (id: number, title: string, content: string) => {
  const db = await getDb();
  await db.run('UPDATE articles SET title = ?, content = ? WHERE id = ?', [title, content, id]);
};

export const deleteArticle = async (id: number) => {
  const db = await getDb();
  await db.run('DELETE FROM articles WHERE id = ?', [id]);
};
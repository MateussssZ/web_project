import { Database } from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

const dbPath = process.env.SQLITE_PATH || '/data/database.sqlite';

const dbPromise = open({
  filename: dbPath,
  driver: Database
});

export const getDb = async () => {
  return dbPromise;
};

export const initializeDb = async () => {
  const db = await getDb();
  // Читаем схему из db.sql
  const schemaPath = path.resolve(process.cwd(), 'db.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  await db.exec(schema);
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

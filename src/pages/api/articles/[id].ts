import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticleById, updateArticle, deleteArticle } from '../../../db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }

  switch (req.method) {
    case 'GET': {
      const article = await getArticleById(Number(id));
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }
      res.status(200).json(article);
      break;
    }
    case 'PUT': {
      const { title, content } = req.body;
      if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
      }
      await updateArticle(Number(id), title, content);
      res.status(200).json({ id, title, content });
      break;
    }
    case 'DELETE': {
      await deleteArticle(Number(id));
      res.status(204).end();
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
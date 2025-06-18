import { NextApiRequest, NextApiResponse } from 'next';
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../../db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (req.query.id) {
                const article = await getArticleById(Number(req.query.id));
                if (article) {
                    res.status(200).json(article);
                } else {
                    res.status(404).json({ message: 'Article not found' });
                }
            } else {
                const articles = await getArticles();
                res.status(200).json(articles);
            }
            break;
        case 'POST':
            const { title, content } = req.body;
            if (!title || !content) {
                res.status(400).json({ message: 'Title and content are required' });
                return;
            }
            const newArticleId = await createArticle(title, content);
            res.status(201).json({ id: newArticleId, title, content });
            break;
        // case 'PUT':
        //     const updatedArticle = await updateArticle(Number(req.query.id), req.body);
        //     if (updatedArticle) {
        //         res.status(200).json(updatedArticle);
        //     } else {
        //         res.status(404).json({ message: 'Article not found' });
        //     }
        //     break;
        // case 'DELETE':
        //     const deleted = await deleteArticle(Number(req.query.id));
        //     if (deleted) {
        //         res.status(204).end();
        //     } else {
        //         res.status(404).json({ message: 'Article not found' });
        //     }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
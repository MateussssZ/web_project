import { Router } from 'express';
import { ArticlesController } from '../controllers/articles.controller';

const router = Router();
const db = require('../db/index'); // или импортируйте getDb и другие методы, если нужно
const articlesController = new ArticlesController(db);

export function setRoutes(app: Router) {
    app.get('/articles', articlesController.getAllArticles.bind(articlesController));
    app.get('/articles/:id', articlesController.getArticleById.bind(articlesController));
    app.post('/articles', articlesController.createArticle.bind(articlesController));
    app.put('/articles/:id', articlesController.updateArticle.bind(articlesController));
    app.delete('/articles/:id', articlesController.deleteArticle.bind(articlesController));
}
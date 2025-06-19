export class ArticlesController {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    async getAllArticles(req: any, res: any) {
        try {
            const articles = await this.db.getArticles();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching articles' });
        }
    }

    async getArticleById(req: any, res: any) {
        const { id } = req.params;
        try {
            const article = await this.db.getArticleById(Number(id));
            if (article) {
                res.status(200).json(article);
            } else {
                res.status(404).json({ message: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching article' });
        }
    }

    async createArticle(req: any, res: any) {
        const { title, content } = req.body;
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user
            const newArticleId = await this.db.createArticle(title, content, userId);
            res.status(201).json({ id: newArticleId, title, content });
        } catch (error) {
            res.status(500).json({ message: 'Error creating article' });
        }
    }

    async updateArticle(req: any, res: any) {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            await this.db.updateArticle(Number(id), title, content);
            res.status(200).json({ message: 'Article updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating article' });
        }
    }

    async deleteArticle(req: any, res: any) {
        const { id } = req.params;
        try {
            await this.db.deleteArticle(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting article' });
        }
    }
}
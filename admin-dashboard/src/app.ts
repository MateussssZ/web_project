import express from 'express';
import cors from 'cors';
import path from 'path';
import { initializeDb, getArticles, getArticleById, updateArticle, deleteArticle } from './db/index';
import { setRoutes } from './routes/articles.routes';
import { authMiddleware } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(authMiddleware);
app.use(cors());


// Список статей
app.get('/', async (req, res) => {
  const articles = await getArticles();
  res.render('dashboard', { articles });
});

// Страница редактирования статьи
app.get('/articles/:id/edit', async (req, res) => {
  const article = await getArticleById(Number(req.params.id));
  if (!article) return res.status(404).send('Not found');
  res.render('edit', { article });
});

// Обработка редактирования
app.post('/articles/:id/edit', async (req, res) => {
  const { title, content } = req.body;
  await updateArticle(Number(req.params.id), title, content);
  res.redirect('/');
});

// Удаление статьи
app.post('/articles/:id/delete', async (req, res) => {
  await deleteArticle(Number(req.params.id));
  res.redirect('/');
});

initializeDb()
  .then(() => {
    setRoutes(app);
    app.listen(PORT, () => {
      console.log(`Admin dashboard running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to the database:', error);
  });
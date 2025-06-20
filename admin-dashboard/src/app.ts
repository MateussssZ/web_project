import express from 'express';
import { initializeDb } from './db/index';
import { setRoutes } from './routes/articles.routes';
import { authMiddleware } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(authMiddleware);

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
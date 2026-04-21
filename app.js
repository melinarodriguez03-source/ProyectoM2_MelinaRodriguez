import express from 'express';
import authorsRouter from './src/routes/authors.js';
import postsRouter from './src/routes/posts.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Blog API',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;
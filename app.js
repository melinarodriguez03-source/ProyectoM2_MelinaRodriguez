import express from 'express';
import authorsRouter from './src/routes/authors.js';
import postsRouter from './src/routes/posts.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';

const swaggerDocument = jsyaml.load(readFileSync('./openapi.yaml', 'utf8'));


const app = express();

app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
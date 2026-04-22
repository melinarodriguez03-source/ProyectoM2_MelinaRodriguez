import express from 'express';
import * as authorsControllers from '../controllers/authorsControllers.js';

const router = express.Router();

router.get('/', authorsControllers.getAuthors);
router.get('/:id', authorsControllers.getAuthorById);
router.post('/', authorsControllers.createAuthor);
router.put('/:id', authorsControllers.updateAuthor);
router.delete('/:id', authorsControllers.deleteAuthor);

export default router;
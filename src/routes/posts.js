import express from 'express';
import * as postsControllers from '../controllers/postsControllers.js';   
const router = express.Router();

router.get('/', postsControllers.getPosts);
router.get('/:id', postsControllers.getPostById);
router.post('/', postsControllers.createPost);
router.put('/:id', postsControllers.updatePost);
router.delete('/:id', postsControllers.deletePost);
router.get('/author/:authorId', postsControllers.getPostsByAuthorId);

export default router;
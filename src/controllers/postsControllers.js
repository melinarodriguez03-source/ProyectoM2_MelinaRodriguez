import * as services from '../services/postsServices.js';

export async function getPosts(req, res, next) {
  try {
    const { published } = req.query;
    const publishedBool = published !== undefined ? published === 'true' : undefined; // 👈 convertir a boolean
    const posts = await services.getAllPosts(publishedBool);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getPostById(req, res, next) {
  try {
    const post = await services.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    next(error);
  }
}

export async function createPost(req, res, next) {
  const { title, content, author_id, published } = req.body;
  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'Título, contenido y author_id son requeridos' });
  }
  try {
    const newPost = await services.createPost({ title, content, author_id, published }); // 👈 objeto
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req, res, next) {
  try {
    const updatedPost = await services.updatePost(req.params.id, req.body); // 👈 objeto
    if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    const rowCount = await services.deletePost(req.params.id);
    if (rowCount === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ message: 'Post eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}

export async function getPostsByAuthorId(req, res, next) {
  try {
    const posts = await services.getPostsByAuthorId(req.params.authorId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}
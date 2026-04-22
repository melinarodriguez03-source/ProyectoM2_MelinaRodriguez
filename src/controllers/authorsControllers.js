import * as services from '../services/authorsServices.js';

export async function getAuthors(req, res, next) {
  try {
    const authors = await services.getAllAuthors(); // 👈 getAllAuthors
    res.json(authors);
  } catch (error) {
    next(error);
  }
}

export async function getAuthorById(req, res, next) {
  try {
    const author = await services.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
  } catch (error) {
    next(error);
  }
}

export async function createAuthor(req, res, next) {
  const { name, email, bio } = req.body; // 👈 desestructurar
  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  try {
    const newAuthor = await services.createAuthor(name, email, bio); // 👈 parámetros separados
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
}

export async function updateAuthor(req, res, next) {
  const { name, email, bio } = req.body; // 👈 desestructurar
  try {
    const updatedAuthor = await services.updateAuthor(req.params.id, name, email, bio); // 👈 parámetros separados
    if (!updatedAuthor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(updatedAuthor);
  } catch (error) {
    next(error);
  }
}

export async function deleteAuthor(req, res, next) {
  try {
    const rowCount = await services.deleteAuthor(req.params.id); // 👈 capturar resultado
    if (rowCount === 0) return res.status(404).json({ error: 'Autor no encontrado' }); // 👈 verificar
    res.json({ message: 'Autor eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}
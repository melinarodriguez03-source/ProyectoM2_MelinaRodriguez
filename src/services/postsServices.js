import { pool } from '../db/config.js';

export async function getAllPosts(published) {
  let query = 'SELECT * FROM posts';
  let params = []; if (published !== undefined) {
    query += ' WHERE published = $1';  params.push(published);
  }

  query += ' ORDER BY created_at DESC';
  const result = await pool.query(query, params);
  return result.rows;
}

export async function getPostById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0] || null;
}   

export async function createPost({ title, content, author_id, published }) {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, author_id, published || false]
  );
  return result.rows[0];
}

export async function updatePost(id, { title, content, author_id, published }) {
  const result = await pool.query(
    'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), author_id = COALESCE($3, author_id), published = COALESCE($4, published) WHERE id = $5 RETURNING *',
    [title, content, author_id, published, id]
  );
  return result.rows[0] || null;
}

export async function deletePost(id) {
  const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  return result.rowCount;
}   

export async function getPostsByAuthorId(authorId) {
  const result = await pool.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC', [authorId]);
  return result.rows;
}   


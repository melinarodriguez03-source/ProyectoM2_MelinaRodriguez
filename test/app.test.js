import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
 
// Mock del pool ANTES de importar app
vi.mock('../db/config.js', () => ({
  pool: {
    query: vi.fn()
  }
}));
 
import app from '../app.js';
import { pool } from '../db/config.js';
 
// ─── AUTHORS ─────────────────────────────────────────────────────────────────
 
describe('GET /api/authors', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('devuelve lista de autores', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Juan', email: 'juan@test.com', bio: null }]
    });
 
    const res = await request(app).get('/api/authors');
 
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Juan');
  });
 
  test('devuelve array vacío si no hay autores', async () => {
    pool.query.mockResolvedValue({ rows: [] });
 
    const res = await request(app).get('/api/authors');
 
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
 
describe('GET /api/authors/:id', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('devuelve autor existente', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Juan', email: 'juan@test.com' }]
    });
 
    const res = await request(app).get('/api/authors/1');
 
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });
 
  test('devuelve 404 si el autor no existe', async () => {
    pool.query.mockResolvedValue({ rows: [] });
 
    const res = await request(app).get('/api/authors/999');
 
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toContain('no encontrado');
  });
});
 
describe('POST /api/authors', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('crea autor con datos válidos', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Juan', email: 'juan@test.com', bio: null }]
    });
 
    const res = await request(app)
      .post('/api/authors')
      .send({ name: 'Juan', email: 'juan@test.com' });
 
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Juan');
  });
 
  test('rechaza request sin nombre', async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({ email: 'juan@test.com' });
 
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('requeridos');
  });
 
  test('rechaza request sin email', async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({ name: 'Juan' });
 
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('requeridos');
  });
 
  test('rechaza request vacío', async () => {
    const res = await request(app).post('/api/authors').send({});
 
    expect(res.statusCode).toBe(400);
  });
 
  test('devuelve 409 si el email ya existe', async () => {
    pool.query.mockRejectedValue({ code: '23505' });
 
    const res = await request(app)
      .post('/api/authors')
      .send({ name: 'Juan', email: 'juan@test.com' });
 
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toContain('email ya está registrado');
  });
});
 
describe('PUT /api/authors/:id', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('actualiza autor existente', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Juan Actualizado', email: 'juan@test.com' }]
    });
 
    const res = await request(app)
      .put('/api/authors/1')
      .send({ name: 'Juan Actualizado' });
 
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Juan Actualizado');
  });
 
  test('devuelve 404 si el autor no existe', async () => {
    pool.query.mockResolvedValue({ rows: [] });
 
    const res = await request(app)
      .put('/api/authors/999')
      .send({ name: 'Test' });
 
    expect(res.statusCode).toBe(404);
  });
});
 
describe('DELETE /api/authors/:id', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('elimina autor existente', async () => {
    pool.query.mockResolvedValue({ rowCount: 1 });
 
    const res = await request(app).delete('/api/authors/1');
 
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('eliminado');
  });
 
  test('devuelve 404 si el autor no existe', async () => {
    pool.query.mockResolvedValue({ rowCount: 0 });
 
    const res = await request(app).delete('/api/authors/999');
 
    expect(res.statusCode).toBe(404);
  });
});
 
// ─── POSTS ───────────────────────────────────────────────────────────────────
 
describe('GET /api/posts', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('devuelve lista de posts', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, title: 'Post 1', content: 'Contenido', author_id: 1, published: true }]
    });
 
    const res = await request(app).get('/api/posts');
 
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });
 
  test('filtra posts publicados con ?published=true', async () => {
    pool.query.mockResolvedValue({ rows: [] });
 
    const res = await request(app).get('/api/posts?published=true');
 
    expect(res.statusCode).toBe(200);
    const callArg = pool.query.mock.calls[0][0];
    expect(callArg).toContain('WHERE published');
  });
});
 
describe('GET /api/posts/:id', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('devuelve post existente', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, title: 'Post 1', content: 'Contenido', author_id: 1 }]
    });
 
    const res = await request(app).get('/api/posts/1');
 
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });
 
  test('devuelve 404 si el post no existe', async () => {
    pool.query.mockResolvedValue({ rows: [] });
 
    const res = await request(app).get('/api/posts/999');
 
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toContain('no encontrado');
  });
});
 
describe('POST /api/posts', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('crea post con datos válidos', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, title: 'Título', content: 'Contenido largo', author_id: 1, published: false }]
    });
 
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Título', content: 'Contenido largo', author_id: 1 });
 
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
 
  test('rechaza post sin título', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ content: 'Contenido', author_id: 1 });
 
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('requeridos');
  });
 
  test('rechaza post sin contenido', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Título', author_id: 1 });
 
    expect(res.statusCode).toBe(400);
  });
 
  test('rechaza post sin author_id', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Título', content: 'Contenido' });
 
    expect(res.statusCode).toBe(400);
  });
 
  test('devuelve 404 si el autor no existe (FK violation)', async () => {
    pool.query.mockRejectedValue({ code: '23503' });
 
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Título', content: 'Contenido', author_id: 999 });
 
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toContain('autor especificado no existe');
  });
});
 
describe('PUT /api/posts/:id', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('actualiza post existente', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 1, title: 'Título actualizado', content: 'Contenido', author_id: 1 }]
    });
 
    const res = await request(app)
      .put('/api/posts/1')
      .send({ title: 'Título actualizado' });
 
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Título actualizado');
  });
 
  test('devuelve 404 si el post no existe', async () => {
    pool.query.mockResolvedValue({ rows: [] });
 
    const res = await request(app).put('/api/posts/999').send({ title: 'Test' });
 
    expect(res.statusCode).toBe(404);
  });
});
 
describe('DELETE /api/posts/:id', () => {
  beforeEach(() => vi.clearAllMocks());
 
  test('elimina post existente', async () => {
    pool.query.mockResolvedValue({ rowCount: 1 });
 
    const res = await request(app).delete('/api/posts/1');
 
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('eliminado');
  });
 
  test('devuelve 404 si el post no existe', async () => {
    pool.query.mockResolvedValue({ rowCount: 0 });
 
    const res = await request(app).delete('/api/posts/999');
 
    expect(res.statusCode).toBe(404);
  });
});
import { describe, test, expect, vi } from 'vitest';
import { errorHandler } from '../middleware/errorHandler.js';
 
function mockRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}
 
describe('errorHandler middleware', () => {
  test('responde 409 por email duplicado (código 23505)', () => {
    const err = { code: '23505' };
    const res = mockRes();
 
    errorHandler(err, {}, res, () => {});
 
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('email') })
    );
  });
 
  test('responde 404 por FK inválida (código 23503)', () => {
    const err = { code: '23503' };
    const res = mockRes();
 
    errorHandler(err, {}, res, () => {});
 
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('autor') })
    );
  });
 
  test('responde 500 para errores genéricos', () => {
    const err = new Error('algo salió mal');
    const res = mockRes();
 
    errorHandler(err, {}, res, () => {});
 
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'algo salió mal' })
    );
  });
 
  test('responde 500 con mensaje por defecto si no hay message', () => {
    const err = {};
    const res = mockRes();
 
    errorHandler(err, {}, res, () => {});
 
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Error interno del servidor' })
    );
  });
 
  test('usa err.status si está definido', () => {
    const err = { status: 422, message: 'datos inválidos' };
    const res = mockRes();
 
    errorHandler(err, {}, res, () => {});
 
    expect(res.status).toHaveBeenCalledWith(422);
  });
});
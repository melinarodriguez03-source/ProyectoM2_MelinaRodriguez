import { describe, test, expect } from 'vitest';
import {
  validarNombre,
  validarEmail,
  validarBio,
  validarTitulo,
  validarContenido,
  validarAuthorId,
  validarPublished
} from '../../validators.js';
 
// ─── validarNombre ───────────────────────────────────────────────────────────
 
describe('validarNombre', () => {
  test('acepta nombre válido', () => {
    expect(validarNombre('Juan Pérez')).toBe(null);
  });
 
  test('rechaza nombre vacío', () => {
    expect(validarNombre('')).toContain('requerido');
  });
 
  test('rechaza nombre null', () => {
    expect(validarNombre(null)).toContain('requerido');
  });
 
  test('rechaza nombre undefined', () => {
    expect(validarNombre(undefined)).toContain('requerido');
  });
 
  test('rechaza nombre de 1 caracter', () => {
    expect(validarNombre('A')).toContain('2 caracteres');
  });
 
  test('rechaza nombre mayor a 100 caracteres', () => {
    expect(validarNombre('A'.repeat(101))).toContain('100 caracteres');
  });
 
  test('acepta nombre de exactamente 2 caracteres', () => {
    expect(validarNombre('Al')).toBe(null);
  });
});
 
// ─── validarEmail ────────────────────────────────────────────────────────────
 
describe('validarEmail', () => {
  test('acepta email válido', () => {
    expect(validarEmail('test@example.com')).toBe(null);
  });
 
  test('rechaza email vacío', () => {
    expect(validarEmail('')).toContain('requerido');
  });
 
  test('rechaza email null', () => {
    expect(validarEmail(null)).toContain('requerido');
  });
 
  test('rechaza email sin @', () => {
    expect(validarEmail('testexample.com')).toContain('inválido');
  });
 
  test('rechaza email sin dominio', () => {
    expect(validarEmail('test@')).toContain('inválido');
  });
 
  test('rechaza email sin extensión', () => {
    expect(validarEmail('test@example')).toContain('inválido');
  });
 
  test('acepta email con subdominio', () => {
    expect(validarEmail('user@mail.example.com')).toBe(null);
  });
});
 
// ─── validarBio ──────────────────────────────────────────────────────────────
 
describe('validarBio', () => {
  test('acepta bio válida', () => {
    expect(validarBio('Escritor y periodista.')).toBe(null);
  });
 
  test('acepta bio undefined (campo opcional)', () => {
    expect(validarBio(undefined)).toBe(null);
  });
 
  test('acepta bio null (campo opcional)', () => {
    expect(validarBio(null)).toBe(null);
  });
 
  test('rechaza bio mayor a 500 caracteres', () => {
    expect(validarBio('A'.repeat(501))).toContain('500 caracteres');
  });
 
  test('acepta bio de exactamente 500 caracteres', () => {
    expect(validarBio('A'.repeat(500))).toBe(null);
  });
});
 
// ─── validarTitulo ───────────────────────────────────────────────────────────
 
describe('validarTitulo', () => {
  test('acepta título válido', () => {
    expect(validarTitulo('Mi primer post')).toBe(null);
  });
 
  test('rechaza título vacío', () => {
    expect(validarTitulo('')).toContain('requerido');
  });
 
  test('rechaza título null', () => {
    expect(validarTitulo(null)).toContain('requerido');
  });
 
  test('rechaza título de 2 caracteres', () => {
    expect(validarTitulo('Ab')).toContain('3 caracteres');
  });
 
  test('rechaza título mayor a 200 caracteres', () => {
    expect(validarTitulo('A'.repeat(201))).toContain('200 caracteres');
  });
 
  test('acepta título de exactamente 3 caracteres', () => {
    expect(validarTitulo('Abc')).toBe(null);
  });
});
 
// ─── validarContenido ────────────────────────────────────────────────────────
 
describe('validarContenido', () => {
  test('acepta contenido válido', () => {
    expect(validarContenido('Este es el contenido del post.')).toBe(null);
  });
 
  test('rechaza contenido vacío', () => {
    expect(validarContenido('')).toContain('requerido');
  });
 
  test('rechaza contenido null', () => {
    expect(validarContenido(null)).toContain('requerido');
  });
 
  test('rechaza contenido menor a 10 caracteres', () => {
    expect(validarContenido('Corto')).toContain('10 caracteres');
  });
 
  test('acepta contenido de exactamente 10 caracteres', () => {
    expect(validarContenido('1234567890')).toBe(null);
  });
});
 
// ─── validarAuthorId ─────────────────────────────────────────────────────────
 
describe('validarAuthorId', () => {
  test('acepta author_id válido', () => {
    expect(validarAuthorId(1)).toBe(null);
  });
 
  test('acepta author_id como string numérico', () => {
    expect(validarAuthorId('5')).toBe(null);
  });
 
  test('rechaza author_id undefined', () => {
    expect(validarAuthorId(undefined)).toContain('requerido');
  });
 
  test('rechaza author_id negativo', () => {
    expect(validarAuthorId(-1)).toContain('entero positivo');
  });
 
  test('rechaza author_id cero', () => {
    expect(validarAuthorId(0)).toContain('requerido');
  });
 
  test('rechaza author_id texto', () => {
    expect(validarAuthorId('abc')).toContain('entero positivo');
  });
});
 
// ─── validarPublished ────────────────────────────────────────────────────────
 
describe('validarPublished', () => {
  test('acepta true', () => {
    expect(validarPublished(true)).toBe(null);
  });
 
  test('acepta false', () => {
    expect(validarPublished(false)).toBe(null);
  });
 
  test('acepta undefined (campo opcional)', () => {
    expect(validarPublished(undefined)).toBe(null);
  });
 
  test('rechaza string "true"', () => {
    expect(validarPublished('true')).toContain('booleano');
  });
 
  test('rechaza número 1', () => {
    expect(validarPublished(1)).toContain('booleano');
  });
});
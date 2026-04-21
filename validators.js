// --- Autores ---
 
export function validarNombre(name) {
  if (!name) return 'El nombre es requerido';
  if (typeof name !== 'string') return 'El nombre debe ser un texto';
  if (name.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
  if (name.trim().length > 100) return 'El nombre no puede superar los 100 caracteres';
  return null;
}
 
export function validarEmail(email) {
  if (!email) return 'El email es requerido';
  if (typeof email !== 'string') return 'El email debe ser un texto';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'El formato del email es inválido';
  return null;
}
 
export function validarBio(bio) {
  if (bio === undefined || bio === null) return null;
  if (typeof bio !== 'string') return 'La bio debe ser un texto';
  if (bio.length > 500) return 'La bio no puede superar los 500 caracteres';
  return null;
}
 
// --- Posts ---
 
export function validarTitulo(title) {
  if (!title) return 'El título es requerido';
  if (typeof title !== 'string') return 'El título debe ser un texto';
  if (title.trim().length < 3) return 'El título debe tener al menos 3 caracteres';
  if (title.trim().length > 200) return 'El título no puede superar los 200 caracteres';
  return null;
}
 
export function validarContenido(content) {
  if (!content) return 'El contenido es requerido';
  if (typeof content !== 'string') return 'El contenido debe ser un texto';
  if (content.trim().length < 10) return 'El contenido debe tener al menos 10 caracteres';
  return null;
}
 
export function validarAuthorId(author_id) {
  if (!author_id) return 'El author_id es requerido';
  if (!Number.isInteger(Number(author_id)) || Number(author_id) <= 0) {
    return 'El author_id debe ser un número entero positivo';
  }
  return null;
}
 
export function validarPublished(published) {
  if (published === undefined || published === null) return null;
  if (typeof published !== 'boolean') return 'published debe ser un booleano';
  return null;
}
 
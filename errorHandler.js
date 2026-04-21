export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.code === '23505') {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }

  if (err.code === '23503') {
    return res.status(404).json({ error: 'El autor especificado no existe' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
}
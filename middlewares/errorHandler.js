function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: err.errors.map((e) => e.message),
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message,
  });
}

module.exports = errorHandler;

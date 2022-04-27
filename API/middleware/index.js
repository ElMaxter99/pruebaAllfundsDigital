const createError = require('http-errors');

// Aquí manejo errores

module.exports.error404Handler = (req, res, next) => {
  next(createError(404, "la pagina no existe"));
};


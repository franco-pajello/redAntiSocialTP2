const { Usuario } = require("../schema");

const validarUsuario = (req, res, next) => {
  const { error } = Usuario.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Los datos de entrada no cumplen con el formato requerido.",
      error: error.details[0].message,
    });
  }
  next();
};

module.exports = validarUsuario;

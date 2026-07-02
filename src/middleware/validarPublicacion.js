const { Publicacion } = require("../schema");

const validarPublicacion = (req, res, next) => {
  const { error } = Publicacion.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validarPublicacion;

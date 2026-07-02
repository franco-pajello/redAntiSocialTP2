const { Comentario } = require("../schema");

const validarComentario = (req, res, next) => {
  const { idUser, idPublicacion } = req.params;

  const { error } = Comentario.validate({
    ...req.body,
    publicacion: idPublicacion || req.body.publicacion,
    usuario: idUser,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validarComentario;

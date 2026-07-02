const { Comentario } = require("../models");

const validarPermisosDeComentario = async (req, res, next) => {
  try {
    const comentarioExistente = req.comentario;

    if (
      comentarioExistente.usuario &&
      comentarioExistente.usuario._id.toString() !== req.usuario._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "No tenés permisos para editar este comentario" });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al validar el identificador del comentario.",
      error: error.message,
    });
  }
};

module.exports = validarPermisosDeComentario;

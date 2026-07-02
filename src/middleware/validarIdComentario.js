const { Comentario } = require("../models");

const validarIdComentario = async (req, res, next) => {
  try {
    const { idComment } = req.params;

    const comentarioExistente = await Comentario.findById(idComment)
      .populate("usuario")
      .populate("publicacion");

    if (!comentarioExistente) {
      return res.status(404).json({
        message: "El comentario solicitado no existe.",
      });
    }

    req.comentario = comentarioExistente;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al validar el identificador del comentario.",
      error: error.message,
    });
  }
};

module.exports = validarIdComentario;

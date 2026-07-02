const { Publicacion, Usuario } = require("../models");

const validarIdPost = async (req, res, next) => {
  try {
    const { idPublicacion } = req.params;

    const data = await Publicacion.findById(idPublicacion)
      .populate("usuario", "nickName activo ")
      .populate("tags", "tag")
      .populate("comentarios");
    if (!data) {
      return res
        .status(404)
        .json({ message: "La publicación solicitada no existe." });
    }
    if (!data.usuario.activo) {
      return res.status(404).json({
        message: "Error al realizar la petición, usuario inactivo.",
      });
    }

    req.publicacion = data;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al validar el identificador de la publicación.",
      error: error.message,
    });
  }
};

module.exports = validarIdPost;

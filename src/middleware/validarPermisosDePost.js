const { Usuario } = require("../models");
const validarPermisosDePost = (req, res, next) => {
  try {
    const postExistente = req.publicacion;
    const {idUser} = req.params;
    if (postExistente.usuario._id.toString() !== idUser) {
      return res
        .status(403)
        .json({ message: "No tenés permisos para editar esta publicación" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al validar el identificador del usuario.",
      error: error.message,
    });
  }
};

module.exports = validarPermisosDePost;

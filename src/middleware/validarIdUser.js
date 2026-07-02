const { Usuario } = require("../models");

const validarIdUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const usuario = await Usuario.findById(idUser);

    if (!usuario) {
      return res
        .status(404)
        .json({ message: "El usuario solicitado no existe." });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al validar el identificador del usuario.",
      error: error.message,
    });
  }
};

module.exports = validarIdUser;

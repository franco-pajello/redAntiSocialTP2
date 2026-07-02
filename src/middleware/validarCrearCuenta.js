const { Usuario } = require("../models");

const validarCrearCuenta = async (req, res, next) => {
  try {
    const { nickName, email } = req.body;

    const existeNickName = await Usuario.findOne({ nickName });
    const existeEmail = await Usuario.findOne({ email });

    if (existeNickName && existeEmail) {
      return res.status(400).json({
        message: "Esta cuenta ya existe",
      });
    }
    if (existeEmail) {
      return res.status(400).json({
        message: "El email ya está en uso.",
      });
    }
    if (existeNickName) {
      return res.status(400).json({
        message: "El nombre de usuario ya está en uso.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al verificar la disponibilidad de la cuenta.",
      error: error.message,
    });
  }
};

module.exports = validarCrearCuenta;

const validarUserActivo = async (req, res, next) => {
  try {
    const usuario = req.usuario;

    if (!usuario || !usuario.activo) {
      return res.status(404).json({ message: "El usuario se encuentra inactivo o dado de baja." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ 
      message: "Error interno al validar el estado del usuario.", 
      error: error.message 
    });
  }
};

module.exports = validarUserActivo;
const { Tag } = require("../models");

const validarIdTag = async (req, res, next) => {
  try {
    const { idTag } = req.params;
    const tag = await Tag.findById(idTag);

    if (!tag) {
      return res.status(404).json({ message: "El tag solicitado no existe." });
    }

    req.tag = tag;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al validar el identificador del tag.",
      error: error.message,
    });
  }
};

module.exports = validarIdTag;

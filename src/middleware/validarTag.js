const { Tag } = require("../schema");

const validarTag = (req, res, next) => {
  const { error } = Tag.validate(req.body);

  if (error) {
    return res.status(400).json({ 
      message: "Error de validación en los datos de entrada.", 
      error: error.details[0].message 
    });
  }
  next();
};

module.exports = validarTag;

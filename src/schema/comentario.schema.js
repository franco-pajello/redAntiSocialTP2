const Joi = require("joi");

const schemaComentario = Joi.object({
  descripcion: Joi.string().trim().required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción es requerida",
  }),
  usuario: Joi.string().required(),
  publicacion: Joi.string().required(),
});

module.exports = schemaComentario;

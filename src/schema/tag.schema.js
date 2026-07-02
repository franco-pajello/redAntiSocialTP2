const Joi = require("joi");

const schemaTag = Joi.object({
  tag: Joi.string().trim().required().messages({
    "string.empty": "El tag no puede estar vacío",
    "any.required": "El tag es requerido",
  }),
  publicaciones: Joi.array().items(Joi.string()).optional(),
});

module.exports = schemaTag;

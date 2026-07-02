const Joi = require("joi");

const schemaUsuario = Joi.object({
  nickName: Joi.string().trim().required().messages({
    "string.empty": "El nickName no puede estar vacío",
    "any.required": "El nickName es requerido",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.empty": "El email no puede estar vacío",
    "string.email": "El formato del email no es válido",
    "any.required": "El email es requerido",
  }),
  password: Joi.string().trim().required().messages({
    "string.empty": "El password no puede estar vacío",
    "any.required": "El password es requerido",
  }),

  activo: Joi.boolean().default(true),
  comentarios: Joi.array().items(Joi.string()).optional(),
  publicaciones: Joi.array().items(Joi.string()).optional(),
});

module.exports = schemaUsuario;

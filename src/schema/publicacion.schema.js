const Joi = require("joi");
const schemaTag = require("./tag.schema");
const schemaImagen = require("./imagen.schema");

const schemaPublicacion = Joi.object({
  descripcion: Joi.string().trim().required().messages({
    "string.empty": "La publicación no puede estar vacía",
    "any.required": "La descripción es requerida",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  imagenes: Joi.array().items(schemaImagen).optional(),
});

module.exports = schemaPublicacion;

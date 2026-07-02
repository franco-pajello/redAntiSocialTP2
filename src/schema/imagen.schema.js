const Joi = require("joi");

const schemaImagen = Joi.object({
  path: Joi.string().trim().required(),
});

module.exports = schemaImagen;

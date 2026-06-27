const mongoose = require("mongoose");
const ImagenSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    trim: true,
  },
});
const PublicacionSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,

      required: [true, "La publicacion no puede estar vacia"],
      trim: true,
    },
    comentarios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario",
        required: false,
      },
    ],
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    imagenes: [ImagenSchema],
  },

  {
    timestamps: true,
  },
);

const Publicacion = mongoose.model("Publicacion", PublicacionSchema);

module.exports = Publicacion;

const mongoose = require("mongoose");
const ComentarioSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
      required: [true, "El comentario no puede estar vacio"],
      trim: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    publicacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publicacion",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comentario = mongoose.model("Comentario", ComentarioSchema);

module.exports = Comentario;

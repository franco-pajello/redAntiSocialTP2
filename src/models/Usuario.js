const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      unique: true,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El email es requerido"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "El password es requerido"],
    },

    activo: {
      type: Boolean,
      default: true,
    },
    comentarios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario",
        required: false,
      },
    ],
    publicaciones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publicacion",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;

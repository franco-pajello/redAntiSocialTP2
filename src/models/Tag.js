const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, "El tag es requerido"],
    unique: true,
    trim: true,
  },
  publicaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publicacion",
    },
  ],
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;

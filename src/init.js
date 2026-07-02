const usuariosPorDefecto = require("../coleccionesDePrueba/usuarios.json");
const tagsPorDefecto = require("../coleccionesDePrueba/tags.json");
const publicacionesPorDefecto = require("../coleccionesDePrueba/publicaciones.json");
const comentariosPorDefecto = require("../coleccionesDePrueba/comentarios.json");

const init = async () => {
  const { Usuario, Tag, Publicacion, Comentario } = require("./models");

  try {
    console.log("Verificando e inicializando datos en la base de datos...");

    const conteoUsuarios = await Usuario.countDocuments();
    if (conteoUsuarios === 0) {
      await Usuario.insertMany(usuariosPorDefecto);
      console.log("Colección de Usuarios inicializada con éxito.");
    } else {
      console.log(
        "La colección de Usuarios ya tiene datos. Se omitió la inserción.",
      );
    }

    const conteoTags = await Tag.countDocuments();
    if (conteoTags === 0) {
      await Tag.insertMany(tagsPorDefecto);
      console.log("Colección de Tags inicializada con éxito.");
    } else {
      console.log(
        "La colección de Tags ya tiene datos. Se omitió la inserción.",
      );
    }

    const conteoPublicaciones = await Publicacion.countDocuments();
    if (conteoPublicaciones === 0) {
      await Publicacion.insertMany(publicacionesPorDefecto);
      console.log("Colección de Publicaciones inicializada con éxito.");
    } else {
      console.log(
        " La colección de Publicaciones ya tiene datos. Se omitió la inserción.",
      );
    }

    const conteoComentarios = await Comentario.countDocuments();
    if (conteoComentarios === 0) {
      await Comentario.insertMany(comentariosPorDefecto);
      console.log("Colección de Comentarios inicializada con éxito.");
    } else {
      console.log(
        "La colección de Comentarios ya tiene datos. Se omitió la inserción.",
      );
    }

    console.log("Proceso de inicialización (init) completado.");
  } catch (error) {
    console.error(
      "Error en la inicialización de la base de datos:",
      error.message,
    );
  }
};

module.exports = init;

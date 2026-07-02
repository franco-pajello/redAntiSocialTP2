const { Publicacion, Comentario, Usuario } = require("../models");
require("dotenv").config();
const Xmeses = process.env.Xmeses || 3;

const getAllComent = async (req, res) => {
  try {
    const publicacion = req.publicacion;
    const fechaLimite = new Date();

    await publicacion.populate({
      path: "comentarios",
      populate: { path: "usuario" },
    });

    fechaLimite.setMonth(fechaLimite.getMonth() - Number(Xmeses));

    const comentariosFiltrados = publicacion.comentarios
      .filter(
        (comentario) =>
          comentario.createdAt >= fechaLimite && comentario.usuario.activo,
      )
      .sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(comentariosFiltrados);
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar los comentarios",
      error: error.message,
    });
  }
};

/* const getOneComent = async (req, res) => {
  try {
    const { idComment } = req.params;
    const comentario = await Comentario.findById(idComment);

    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json(comentario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar el comentario", error: error.message });
  }
};
 */
const createComent = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const publicacion = req.publicacion;
    const miUsuario = req.usuario;

    const nuevoComentario = await Comentario.create({
      descripcion,
      usuario: miUsuario._id,
      publicacion: publicacion._id,
    });
    publicacion.comentarios.addToSet(nuevoComentario._id);
    miUsuario.comentarios.addToSet(nuevoComentario._id);

    await publicacion.save();
    await miUsuario.save();

    res.status(201).json({
      message: "Comentario agregado con éxito",
      data: nuevoComentario,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al comentar",
      error: error.message,
    });
  }
};

const upDateComent = async (req, res) => {
  try {
    const comentarioExistente = req.comentario;

    comentarioExistente.descripcion = req.body.descripcion;

    await comentarioExistente.save();

    res.status(200).json({
      message: "Comentario actualizado con éxito",
      data: comentarioExistente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar el comentario",
      error: error.message,
    });
  }
};

const deleteComent = async (req, res) => {
  try {
    const comentarioExistente = req.comentario;

    const usuario = await Usuario.findById(
      comentarioExistente.usuario,
    ).populate("comentarios");

    const publicacion = await Publicacion.findById(
      comentarioExistente.publicacion,
    ).populate("comentarios");

    await comentarioExistente.deleteOne();

    publicacion.comentarios = publicacion.comentarios.filter(
      (c) => c._id.toString() !== comentarioExistente._id.toString(),
    );

    usuario.comentarios = usuario.comentarios.filter(
      (c) => c._id.toString() !== comentarioExistente._id.toString(),
    );
    await publicacion.save();
    await usuario.save();

    res.status(200).json({
      message: "El comentario fue borrado con éxito",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al borrar el comentario", error: error.message });
  }
};

module.exports = {
  getAllComent,
  /*  getOneComent, */
  createComent,
  upDateComent,
  deleteComent,
};

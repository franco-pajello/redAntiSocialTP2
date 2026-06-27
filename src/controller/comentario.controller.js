const { Publicacion, Comentario, Usuario } = require("../models");
require("dotenv").config();
const Xmeses = process.env.Xmeses || 3;

const getAllComent = async (req, res) => {
  try {
    const { id } = req.params;

    const fechaLimite = new Date();

    fechaLimite.setMonth(fechaLimite.getMonth() - Number(Xmeses));

    const publicacion = await Publicacion.findById(id).populate({
      path: "comentarios",
      populate: { path: "usuario" },
    });

    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

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
    const { idUser, idPublicacion } = req.params;
    const { descripcion } = req.body;
    const publicacion = await Publicacion.findById(idPublicacion);
    const miUsuario = await Usuario.findById(idUser);

    if (!miUsuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    if (!publicacion)
      return res.status(404).json({ message: "Publicación no encontrada" });

    const nuevoComentario = await Comentario.create({
      descripcion,
      usuario: idUser,
      publicacion: idPublicacion,
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
    const { idUser, idComment } = req.params;

    const comentarioExistente = await Comentario.findById(idComment);
    if (!comentarioExistente) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    if (
      comentarioExistente.usuario &&
      comentarioExistente.usuario.toString() !== idUser
    ) {
      return res
        .status(403)
        .json({ message: "No tenés permisos para editar este comentario" });
    }

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
    const { idComment, idUser } = req.params;

    const comentarioExistente = await Comentario.findById(idComment)
      .populate("usuario")
      .populate("publicacion");

    if (!comentarioExistente) {
      return res.status(404).json("El comentario no fue encontrado");
    }

    const userValido = comentarioExistente.usuario._id.toString() === idUser;

    if (!userValido) {
      return res
        .status(403)
        .json("No tenés permisos para borrar este comentario");
    }

    const usuario = comentarioExistente.usuario;
    const publicacion = comentarioExistente.publicacion;

    await comentarioExistente.deleteOne();

    publicacion.comentarios = publicacion.comentarios.filter(
      (c) => c.toString() !== idComment,
    );

    usuario.comentarios = usuario.comentarios.filter(
      (c) => c.toString() !== idComment,
    );
    await publicacion.save();
    await usuario.save();

    res.status(200).json("El comentario fue borrado con éxito");
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

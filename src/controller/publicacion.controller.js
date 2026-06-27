const { Publicacion, Usuario, Tag } = require("../models");
require("dotenv").config();

const Xmeses = process.env.Xmeses || 3;

const getAllPosts = async (_, res) => {
  try {
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - Number(Xmeses));

    const data = await Publicacion.find()
      .populate("usuario", "nickName")
      .populate("tags", "tag")
      .populate({
        path: "comentarios",
        match: { createdAt: { $gte: fechaLimite } },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar publicaciones", error: error.message });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Publicacion.findById(id)
      .populate("usuario", "nickName")
      .populate("tags", "tag")
      .populate("comentarios");

    if (!data) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar la publicación",
      error: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { descripcion, imagenes, tags } = req.body;
    const { idUser } = req.params;

    const usuarioExistente = await Usuario.findById(idUser);
    if (!usuarioExistente) {
      return res.status(404).json({ message: "El usuario creador no existe" });
    }

    const nuevaPublicacion = await Publicacion.create({
      descripcion,
      usuario: idUser,
      imagenes: imagenes || [],
      tags: tags || [],
    });

    if (tags && tags.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tags } },
        { $addToSet: { publicaciones: nuevaPublicacion._id } },
      );
    }

    usuarioExistente.publicaciones.addToSet(nuevaPublicacion._id);
    await usuarioExistente.save();

    res.status(201).json({
      message: "Publicación creada con éxito",
      data: nuevaPublicacion,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear la publicación", error: error.message });
  }
};

const upDatePost = async (req, res) => {
  try {
    const { id, idUser } = req.params;
    const { descripcion, imagenes, tags } = req.body;

    const postExistente = await Publicacion.findById(id);
    if (!postExistente) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    if (postExistente.usuario.toString() !== idUser) {
      return res
        .status(403)
        .json({ message: "No tenés permisos para editar esta publicación" });
    }

    await Tag.updateMany(
      { publicaciones: id },
      { $pull: { publicaciones: id } },
    );

    postExistente.descripcion = descripcion;
    postExistente.imagenes = imagenes;
    postExistente.tags = tags || [];
    await postExistente.save();

    if (tags && tags.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tags } },
        { $addToSet: { publicaciones: id } },
      );
    }

    res.status(200).json({
      message: "Publicación actualizada con éxito",
      data: postExistente,
    });
  } catch (error) {
    res.status(400).json({ message: "Error al editar", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id, idUser } = req.params;

    const publicacion = await Publicacion.findById(id);
    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    if (publicacion.usuario.toString() !== idUser) {
      return res
        .status(403)
        .json({ message: "No tenés permisos para borrar esta publicación" });
    }

    await Tag.updateMany(
      { publicaciones: id },
      { $pull: { publicaciones: id } },
    );

    await publicacion.deleteOne();

    const usuario = await Usuario.findById(idUser);
    if (usuario) {
      usuario.publicaciones = usuario.publicaciones.filter(
        (p) => p.toString() !== id,
      );
      await usuario.save();
    }

    res.status(200).json("Publicación eliminada con éxito");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar publicación", error: error.message });
  }
};

module.exports = {
  getOnePost,
  getAllPosts,
  createPost,
  upDatePost,
  deletePost,
};

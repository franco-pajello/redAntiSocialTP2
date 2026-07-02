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
    const publicacion = req.publicacion;
    res.status(200).json(publicacion);
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

    const usuarioExistente = req.usuario;

    const nuevaPublicacion = await Publicacion.create({
      descripcion,
      usuario: idUser,
      imagenes: imagenes || [],
      tags: tags || [],
    });
    await Tag.updateMany(
      { _id: { $in: tags } },
      { $addToSet: { publicaciones: nuevaPublicacion._id } },
    );

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
    const { descripcion, imagenes, tags } = req.body;

    const postExistente = req.publicacion;

    await Tag.updateMany(
      { publicaciones: postExistente._id },
      { $pull: { publicaciones: postExistente._id } },
    );

    postExistente.descripcion = descripcion;
    postExistente.imagenes = imagenes;
    postExistente.tags = tags || [];
    await postExistente.save();

    if (tags && tags.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tags } },
        { $addToSet: { publicaciones: postExistente._id } },
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
    const usuario = req.usuario;
    const postExistente = req.publicacion;
    await Tag.updateMany(
      { publicaciones: postExistente._id },
      { $pull: { publicaciones: postExistente._id } },
    );

    await postExistente.deleteOne();

    if (usuario) {
      usuario.publicaciones = usuario.publicaciones.filter(
        (p) => p.toString() !== postExistente._id.toString(),
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

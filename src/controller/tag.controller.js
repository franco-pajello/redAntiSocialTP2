const { Tag } = require("../models");

const getAllTag = async (req, res) => {
  try {
    const tags = await Tag.find();

    res.status(200).json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar los tags", error: error.message });
  }
};
const getOneTag = async (req, res) => {
  try {
    const tag = req.tag;

    res.status(200).json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar el tag", error: error.message });
  }
};
const createTag = async (req, res) => {
  try {
    const { tag } = req.body;

    const nuevoTag = await Tag.create({ tag });

    res.status(200).json({ message: "Tag creado con exito", tag: nuevoTag });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el tag", error: error.message });
  }
};
const upDateTag = async (req, res) => {
  try {
    const { tag } = req.body;

    const tagExistente = req.tag;

    tagExistente.tag = tag;

    const tagEditado = await tagExistente.save();

    res.status(200).json({ message: "Tag editado con exito", tag: tagEditado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al editar el tag", error: error.message });
  }
};
const deleteTag = async (req, res) => {
  try {
    const tagExistente = req.tag;

    await tagExistente.deleteOne();

    res.status(200).json({ message: "Tag eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el tag", error: error.message });
  }
};

module.exports = {
  getAllTag,
  getOneTag,
  createTag,
  upDateTag,
  deleteTag,
};

const { Usuario } = require("../models");

const getAllUser = async (_, res) => {
  try {
    const usuario = await Usuario.find({ activo: true });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      message: "Error al recuperar el listado de usuarios.",
      error: error.message,
    });
  }
};
const getOneUser = async (req, res) => {
  try {
    const usuario = req.usuario;
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la información del usuario.",
      error: error.message,
    });
  }
};
const createUser = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      data: nuevoUsuario,
    });
  } catch (error) {
    return res.status(400).json({
      message: "No se pudo completar el registro debido a datos inválidos.",
      error: error.message,
    });
  }
};
const upDateUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const usuarioNuevo = await Usuario.findByIdAndUpdate(idUser, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Usuario actualizado exitosamente.",
      data: usuarioNuevo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al intentar actualizar el usuario.",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const usuarioBorrado = await Usuario.findByIdAndUpdate(idUser, {
      activo: false,
    });
    return res
      .status(200)
      .json({ message: "Usuario dado de baja exitosamente." });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al intentar dar de baja al usuario.",
      error: error.message,
    });
  }
};

module.exports = { getAllUser, getOneUser, createUser, upDateUser, deleteUser };

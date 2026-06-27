const { Usuario } = require("../models");

const getAllUser = async (_, res) => {
  try {
    const usuario = await Usuario.find({ activo: true });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Error al buscar el usuario" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error buscar el usuario", error: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { nickName, email, password } = req.body;

    const existeNickName = await Usuario.findOne({ nickName });
    const existeEmail = await Usuario.findOne({ email });

    if (existeNickName && existeEmail) {
      return res.status(400).json({
        ok: false,
        error: "Esta cuenta ya existe.",
      });
    }
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        error: "El email ya está en uso.",
      });
    }
    if (existeNickName) {
      return res.status(400).json({
        ok: false,
        error: "El nombre de usuario ya está en uso.",
      });
    }

    //////////////////////////////////////

    const nuevoUsuario = await Usuario.create(req.body);
    res.status(200).json("usuario creado");
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
const upDateUser = async (req, res) => {
  try {
    const { id } = req.params;

    /////// del middleware///////////////////////
    const usuarioExistente = await Usuario.findById(id);

    if (!usuarioExistente) {
      return res
        .status(404)
        .json({ ok: false, error: "Usuario no encontrado" });
    }

    ///////////////////////////
    const usuarioNuevo = await findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json("Usuario actualizado");
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioBorrado = await Usuario.findByIdAndUpdate(id, {
      activo: false,
    });
    ////////// valiadar en el middleware q el usuario exista
    if (!usuarioBorrado.activo) {
      return res.status(500).json("Usuario no encontrado");
    }
    ////////////////////////////////////////
    return res.status(200).json("Usuario borrado");
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = { getAllUser, getOneUser, createUser, upDateUser, deleteUser };

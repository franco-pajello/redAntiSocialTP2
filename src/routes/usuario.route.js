const { Router } = require("express");
const {
  getAllUser,
  getOneUser,
  createUser,
  deleteUser,
  upDateUser,
} = require("../controller/usuario.controller");
const validarCrearCuenta = require("../middleware/validarCrearCuenta");
const validarIdUser = require("../middleware/validarIdUser");
const validarUserActivo = require("../middleware/validarUserActivo");
const validarUsuario = require("../middleware/validarUsuario");

const router = Router();

router.get("/", getAllUser);
router.get("/:idUser", validarIdUser, validarUserActivo, getOneUser);
router.post("/", validarUsuario, validarCrearCuenta, createUser);
router.put(
  "/:idUser",
  validarUsuario,
  validarIdUser,
  validarUserActivo,
  upDateUser,
);
router.delete("/:idUser", validarIdUser, validarUserActivo, deleteUser);

module.exports = router;

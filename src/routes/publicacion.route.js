const { Router } = require("express");
const {
  getOnePost,
  getAllPosts,
  createPost,
  upDatePost,
  deletePost,
} = require("../controller/publicacion.controller");
const validarPublicacion = require("../middleware/validarPublicacion");
const validarIdPost = require("../middleware/validarIdPost");
const validarIdUser = require("../middleware/validarIdUser");
const validarUserActivo = require("../middleware/validarUserActivo");
const validarPermisosDePost = require("../middleware/validarPermisosDePost");

const router = Router();

router.get("/", getAllPosts);
router.get("/:idPublicacion", validarIdPost, getOnePost);
router.post(
  "/usuario/:idUser",
  validarPublicacion,
  validarIdUser,
  validarUserActivo,
  createPost,
);
router.put(
  "/:idPublicacion/usuario/:idUser",
  validarIdPost,
  validarPublicacion,
  validarIdUser,
  validarPermisosDePost,
  upDatePost,
);
router.delete(
  "/:idPublicacion/usuario/:idUser",
  validarIdPost,
  validarIdUser,
  validarPermisosDePost,
  deletePost,
);

module.exports = router;

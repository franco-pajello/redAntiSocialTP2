const { Router } = require("express");
const {
  getAllComent,
  /*  getOneComent, */
  createComent,
  upDateComent,
  deleteComent,
} = require("../controller/comentario.controller");
const validarComentario = require("../middleware/validarComentario");
const validarIdComentario = require("../middleware/validarIdComentario");
const validarPermisosDeComentario = require("../middleware/validarPermisosDeComentario");
const validarIdPost = require("../middleware/validarIdPost");
const validarIdUser = require("../middleware/validarIdUser");

const router = Router();

router.get("/:idPublicacion/comentario", validarIdPost, getAllComent);
/* router.get("/comentario/:idComment", getOneComent); */
router.post(
  "/:idPublicacion/usuario/:idUser/comentario",
  validarComentario,
  validarIdPost,
  validarIdUser,
  createComent,
);

router.put(
  "/comentario/:idComment/usuario/:idUser",
  validarComentario,
  validarIdComentario,
  validarIdUser,
  validarPermisosDeComentario,
  upDateComent,
);
router.delete(
  "/comentario/:idComment/usuario/:idUser",
  validarIdComentario,
  validarIdUser,
  validarPermisosDeComentario,
  deleteComent,
);

module.exports = router;

const { Router } = require("express");
const {
  getAllComent,
  /*  getOneComent, */
  createComent,
  upDateComent,
  deleteComent,
} = require("../controller/comentario.controller");

const router = Router();

router.get("/:id/comentario", getAllComent);
/* router.get("/comentario/:idComment", getOneComent); */
router.post("/:idPublicacion/usuario/:idUser/comentario", createComent);
router.put("/comentario/:idComment/usuario/:idUser", upDateComent);
router.delete("/comentario/:idComment/usuario/:idUser", deleteComent);

module.exports = router;

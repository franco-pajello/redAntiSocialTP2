const { Router } = require("express");
const {
  getOnePost,
  getAllPosts,
  createPost,
  upDatePost,
  deletePost,
} = require("../controller/publicacion.controller");

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.post("/usuario/:idUser", createPost);
router.put("/:id/usuario/:idUser", upDatePost);
router.delete("/:id/usuario/:idUser", deletePost);

module.exports = router;

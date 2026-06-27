const { Router } = require("express");
const {
  getAllUser,
  getOneUser,
  createUser,
  deleteUser,
  upDateUser,
} = require("../controller/usuario.controller");

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.put("/:id", upDateUser);
router.delete("/:id", deleteUser);

module.exports = router;

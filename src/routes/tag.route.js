const { Router } = require("express");
const {
  getAllTag,
  getOneTag,
  createTag,
  upDateTag,
  deleteTag,
} = require("../controller/tag.controller");
const validarTag = require("../middleware/validarTag");
const validarIdTag = require("../middleware/validarIdTag");
const router = Router();

router.get("/", getAllTag);
router.get("/:idTag", validarIdTag, getOneTag);
router.post("/", validarTag, createTag);
router.put("/:idTag", validarIdTag, validarTag, upDateTag);
router.delete("/:idTag", validarIdTag, deleteTag);

module.exports = router;

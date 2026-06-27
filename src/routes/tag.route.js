const { Router } = require("express");
const {
  getAllTag,
  getOneTag,
  createTag,
  upDateTag,
  deleteTag,
} = require("../controller/tag.controller");

const router = Router();

router.get("/", getAllTag);
router.get("/:idTag", getOneTag);
router.post("/", createTag);
router.put("/:idTag", upDateTag);
router.delete("/:idTag", deleteTag);

module.exports = router;

const Router = require("express");
const router = Router.Router();
const {
  getAllChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("../Controller/chapterController");

router.get("/", getAllChapters);
router.get("/:id", getChapterById);
router.post("/", createChapter);
router.put("/:id", updateChapter);
router.delete("/:id", deleteChapter);

module.exports = router;

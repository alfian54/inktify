const protect = require("../middleware/authMiddleware");
const {
  createChapter,
  getChaptersByStory,
  getChapterById,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController");
const router = require("express").Router();

router.post("/", protect, createChapter);
router.get("/story/:storyId", getChaptersByStory);
router.get("/:chapterId", getChapterById);
router.patch("/:chapterId", protect, updateChapter);
router.delete("/:chapterId", protect, deleteChapter);

module.exports = router;

const protect = require("../middleware/authMiddleware");
const router = require("express").Router();
const {
  createStory,
  getStories,
  getStoryBySlug,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");

router.post("/", protect, createStory);
router.get("/", getStories);
router.get("/:slug", getStoryBySlug);
router.patch("/:slug", protect, updateStory);
router.delete("/:slug", protect, deleteStory);

module.exports = router;

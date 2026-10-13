const Chapter = require("../models/Chapter");
const Story = require("../models/Story");
const sanitizeContent = require("../utils/sanitizeContent");

const createChapter = async (req, res) => {
  try {
    const { storyId, title, content, status } = req.body;
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (story.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const count = await Chapter.countDocuments({ storyId });
    const chapter = new Chapter({
      storyId,
      title,
      content: sanitizeContent(content),
      order: count + 1,
      status,
    });
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChaptersByStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    const chapters = await Chapter.find({ storyId, status: "published" }).sort(
      "order",
    );
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { title, content, status } = req.body;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    const story = await Story.findById(chapter.storyId);
    if (!story || story.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    chapter.title = title ?? chapter.title;
    if (content !== undefined) {
      chapter.content = sanitizeContent(content);
    }
    if (status === "published" && chapter.status !== "published") {
      chapter.publishedAt = new Date();
    }
    chapter.status = status ?? chapter.status;
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    const story = await Story.findById(chapter.storyId);
    if (!story || story.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await chapter.deleteOne();
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createChapter,
  getChaptersByStory,
  getChapterById,
  updateChapter,
  deleteChapter,
};

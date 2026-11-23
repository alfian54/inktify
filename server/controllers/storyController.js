const Story = require("../models/Story");
const Chapter = require("../models/Chapter");
const User = require("../models/User");
const PUBLIC_STATUSES = ["ongoing", "completed"];

const createStory = async (req, res) => {
  try {
    const { title, description, genre, status } = req.body;
    const authorId = req.user.id;

    const story = new Story({
      title,
      description,
      genre,
      status,
      authorId,
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStories = async (req, res) => {
  try {
    const { genre, status, search } = req.query;
    let filter = { status: { $in: PUBLIC_STATUSES } };

    if (genre) {
      filter.genre = genre;
    }

    if (status && PUBLIC_STATUSES.includes(status)) {
      filter.status = status;
    }

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");

      const matchingAuthors = await User.find({ username: regex }).select(
        "_id",
      );

      filter.$or = [
        { title: regex },
        { authorId: { $in: matchingAuthors.map((u) => u._id) } },
      ];
    }

    const stories = await Story.find(filter)
      .lean()
      .populate("authorId", "username avatarUrl");

    // NEW: count published chapters for all these stories in one query
    const counts = await Chapter.aggregate([
      {
        $match: {
          storyId: { $in: stories.map((s) => s._id) },
          status: "published",
        },
      },
      { $group: { _id: "$storyId", count: { $sum: 1 } } },
    ]);

    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id.toString()] = c.count;
    });

    const result = stories.map((s) => ({
      ...s,
      chapterCount: countMap[s._id.toString()] || 0,
    }));

    res.status(200).json(result); // CHANGED: send `result`, not `stories`
  } catch (error) {
    console.error("getStories error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getStoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const story = await Story.findOne({ slug }).populate(
      "authorId",
      "username avatarUrl",
    );
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateStory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, description, genre, status } = req.body;

    const story = await Story.findOne({ slug });
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (story.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    story.title = title ?? story.title;
    story.description = description ?? story.description;
    story.genre = genre ?? story.genre;
    story.status = status ?? story.status;
    await story.save();

    const populated = await story.populate("authorId", "username avatarUrl");
    res.status(200).json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStory = async (req, res) => {
  try {
    const { slug } = req.params;
    const story = await Story.findOne({ slug });
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (story.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Chapter.deleteMany({ storyId: story._id });
    await Story.findOneAndDelete({ slug });
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createStory,
  getStories,
  getStoryBySlug,
  updateStory,
  deleteStory,
};

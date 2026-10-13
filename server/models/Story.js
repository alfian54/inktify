const mongoose = require("mongoose");
const slugify = require("slugify");

const StorySchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    genre: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "ongoing", "completed"],
      default: "draft",
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

StorySchema.pre("save", async function () {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.slug) {
    const existingStory = await mongoose
      .model("Story")
      .findOne({ slug: this.slug, _id: { $ne: this._id } });
    if (existingStory) {
      throw new Error("A story with that title already exists.");
    }
  }
});

module.exports = mongoose.model("Story", StorySchema);

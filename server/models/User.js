const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    bio: {
      type: String,
      required: false,
      maxlength: 1000,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.passwordHash);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

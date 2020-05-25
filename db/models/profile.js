const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "City, Country",
    },
    occupation: {
      type: String,
      default: "What is your job?",
    },
    bio: {
      type: String,
      default: "Tell us a little about yourself.",
    },
    cuisine: {
      type: String,
      default: "What cuisine is your specialty?",
    },
    favoriteFood: {
      type: String,
      default: "What are some of your favorite foods?",
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

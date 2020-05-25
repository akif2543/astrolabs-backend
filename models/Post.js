const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],
    shares: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],
    comments: [
      {
        commenter: {
          type: Schema.Types.ObjectId,
          ref: "Profile",
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        likes: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

function formatDate(date) {
  const dateArr = date.toString().split(" ");
  return dateArr.slice(0, 5).join(" ");
}

PostSchema.virtual("date").get(function () {
  return formatDate(this.createdAt);
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

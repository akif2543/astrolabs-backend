const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
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
    responses: [
      {
        responder: {
          type: Schema.Types.ObjectId,
          ref: "User",
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
  { timestamps: true }
);
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

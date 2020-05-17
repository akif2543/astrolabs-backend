const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      requiired: true,
    },
    postBody: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    shares: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        likes: {
          type: Array,
          default: [],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

function formatDate(date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const minutesString = minutes >= 10 ? minutes : `0${minutes}`;
  const month = date.getMonth();
  const day = date.getDate();
  const hourString = hour >= 10 ? hour : `0${hour}`;
  const monthWord = (month) => {
    switch (month) {
      case 1:
        return "January";
        break;
      case 2:
        return "February";
        break;
      case 3:
        return "March";
        break;
      case 4:
        return "April";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "June";
        break;
      case 7:
        return "July";
        break;
      case 8:
        return "August";
        break;
      case 9:
        return "September";
        break;
      case 10:
        return "October";
        break;
      case 11:
        return "November";
        break;
      case 12:
        return "December";
        break;
    }
  };
  const dayString = day >= 10 ? day : `0${day}`;
  return `${hourString}:${minutesString} on ${dayString} ${monthWord(
    month
  )} ${date.getFullYear()}`;
}

PostSchema.virtual("formatDate").get(function () {
  return formatDate(this.date);
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;

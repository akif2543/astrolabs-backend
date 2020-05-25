const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

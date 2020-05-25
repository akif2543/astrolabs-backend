const mongoose = require("mongoose");
const Post = require("./post");

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  prepTime: {
    type: String,
    required: true,
  },
  cookTime: {
    type: String,
    required: true,
  },
  recipeDescription: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
});

const Recipe = Post.discriminator("Recipe,", RecipeSchema);

module.exports = Recipe;

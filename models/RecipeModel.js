const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    recipeName: {
        type: String,
        required: true
    },
    prepTime: {
        type: String,
        required: true
    },
    cookTime: {
        type: String,
        required: true
    },
    recipeDescription: {
        type: String,
        required: true
    },
    ingredientList: {
        type: String,
        required: true
    },
    recipeDirections: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    shares: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    postBody: {
        type: String,
        required: true
    },
    image: {
        type: String
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
});

module.exports = Post = mongoose.model('post', PostSchema);
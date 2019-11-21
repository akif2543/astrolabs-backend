const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    profilePhoto: {
        type: String,
        require: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);
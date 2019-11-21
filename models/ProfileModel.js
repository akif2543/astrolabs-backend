const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    nickName: {
        type: String,
    },
    profilePhoto: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    occupation: {
        type: String
    },
    bio: {
        type: String
    },
    cuisine: {
        type: String
    },
    favoriteFood: {
        type: String
    },
    followers: {
        type: Array,
        default: []
    },
    reviews: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = UserProfile = mongoose.model('userProfile', UserProfileSchema);
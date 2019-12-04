const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true,
        default: "https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904796/62625444-cook-flat-design-yellow-round-web-icon.jpg"
    },
    location: {
        type: String,
        required: true,
        default: "City, Country"
    },
    occupation: {
        type: String,
        default: "What is your job?"
    },
    bio: {
        type: String,
        default: "Tell us a little about yourself."
    },
    cuisine: {
        type: String,
        default: "What cuisine is your specialty?"
    },
    favoriteFood: {
        type: String,
        default: "What are some of your favorite foods?"
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
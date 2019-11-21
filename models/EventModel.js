const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventBody: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    category: {
        type: Array,
    },
    image: {
        type: String,
        required: true
    },
    attending: {
        type: Array,
        default: []
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

module.exports = Event = mongoose.model('event', EventSchema);
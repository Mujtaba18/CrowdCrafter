const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    date: Date,
    time: String,
    description: String,
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    location: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    }],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Event', eventSchema);
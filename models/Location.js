const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: String,
    capacity: Number,
    availability: Boolean,
    city: String,
    bookingEmail: String,
    bookingPhone: String,
    indoor: Boolean,
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);
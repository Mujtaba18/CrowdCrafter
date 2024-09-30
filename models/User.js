const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    }]
}, {
    timestamps: true
}, {
    profileImage: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    profileImage: {
      type: String,
      default: null
    },
    event: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: false
    }]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
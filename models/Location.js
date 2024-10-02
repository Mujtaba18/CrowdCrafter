const mongoose = require('mongoose')

const locationSchema = mongoose.Schema(
  {
    names: String,
    capacity: Number,
    availability: String,
    city: String,
    bookingEmail: String,
    bookingPhone: String,
    indoor: String,
    event: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    locationImages: {
      type: [String],  // Array of strings to store image filenames
      required: false
    }
  },
  {
    timestamps: true
  }
)

const Location = mongoose.model('Location', locationSchema)

module.exports = Location

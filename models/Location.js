const mongoose = require('mongoose')

const locationSchema = mongoose.Schema(
  {
    names: String,
    capacity: Number,
    availability: Boolean,
    city: String,
    bookingEmail: String,
    bookingPhone: String,
    indoor: Boolean,
    event: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Location = mongoose.model('Location', locationSchema)

module.exports = Location

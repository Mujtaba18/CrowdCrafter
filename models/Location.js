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
    ]
  },
  {
    timestamps: true
  }
)

const Location = mongoose.model('Location', locationSchema)

module.exports = Location

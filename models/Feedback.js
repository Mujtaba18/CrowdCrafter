const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    userName:String,
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Feedback', feedbackSchema)

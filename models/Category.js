const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    color: String,
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    }]
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema)
module.exports = Category
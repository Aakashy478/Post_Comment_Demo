const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    isDelelted: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema, 'comments');
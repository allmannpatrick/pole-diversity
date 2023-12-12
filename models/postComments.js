const mongoose = require('mongoose');

// Mongoose Model
const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.String,
    ref: 'Post',
    required: true},
  name: {
    type: String,
    required: true
  },
  message: {
  type: String,
  required: true
},
  date: {
    type: Date,
    default: Date.now
  }
})

// Export Mongoose "Comment" model
module.exports = mongoose.model('Comment', commentSchema)

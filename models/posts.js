const mongoose = require('mongoose');

// Mongoose Model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  spine: {
    type: String,
    required: true
  },
  date: {
  type: String,
  required: true
},
  img: {
  type: String,
  required: true
  }
})

// Virtual for post's URL
postSchema
.virtual('url')
.get(function () {
  return '/blog/' + this.spine;
});

module.exports = mongoose.model('Post', postSchema)

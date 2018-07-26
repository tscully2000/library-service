const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  cover: String,
  title: String,
  author: String,
  numberOfPages: Number,
  publishDate: Date,
});

mongoose.model('Library', LibrarySchema);

module.exports = mongoose.model('Library');
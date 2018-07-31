const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  cover: String,
  title: String,
  author: String,
  numberOfPages: Number,
  publishDate: String
});

mongoose.model('Library', LibrarySchema);

module.exports = mongoose.model('Library');
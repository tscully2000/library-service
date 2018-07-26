const express = require('express');
const bodyParser = require('body-parser');
const Library = require('../models/Library');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

router.post('/', (req, res) => {
  Library.create({
    cover : req.body.cover,
    title : req.body.title,
    author : req.body.author,
    numberOfPages : req.body.numberOfPages,
    publishDate : new Date(req.body.publishDate)
  },
    (err, book) => {
      if (err) return res.status(500).send('There was a problem adding the information to the database.');
      res.status(200).send(book);
    });
});

router.get('/', (req, res) => {
  Library.find({}, (err, book) => {
    if (err) return res.status(500).send('There was a problem finding books in library.');
    res.status(200).send(book);
  });
});

router.get('/:id', (req, res) => {
  Library.findById(req.params.id, (err, book) => {
    if (err) return res.status(500).send('There was a problem finding that book.');
    res.status(200).send(book);
  });
});

router.delete('/:id', (req, res) => {
  Library.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) return res.status(500).send('There was a problem deleting the book.');
    res.status(200).send(`${book.title} was deleted.`);
  });
});

router.put('/:id', (req, res) => {
  Library.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => {
    if (err) return res.status(500).send('There was a problem editing the book');
    res.status(200).send(`${book.title} was edited.`);
  });
});

module.exports = router;
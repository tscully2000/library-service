const express = require('express');
const bodyParser = require('body-parser');
const Library = require('../models/Library');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

router.post('/', (req, res) => {
  Library.collection.insert(req.body.books, (err, books) => {
    if (err) return res.status(500).send('There was a problem adding the information to the database.');
    res.status(200).send(books);
  });
});

router.get('/', (req, res) => {
  Library.find({}, (err, book) => {
    if (err) return res.status(500).send('There was a problem finding books in library.');
    res.status(200).send(book);
  });
});

router.get('/page/:page', (req, res) => {
  Library.find({}).limit(5).exec((err, book) => {
    if (err) return res.status(500).send('There was a problem finding books in library.');
    res.status(200).send(book);
  });
});

router.get('/search/:search', (req, res) => {
  let text = req.params.search, pattern = new RegExp(text), patternMatch = { $regex: pattern, $options: 'igx' };
  let results = [{ title: patternMatch }, { author: patternMatch }];
  Library.find({ $or: results }, (err, book) => {
    console.log(err);
    if (err) return res.status(500).send('No results matching that search were found.');
    res.status(200).send(book);
  });
});

router.get('/:id', (req, res) => {
  Library.findById(req.params.id, (err, book) => {
    if (err) return res.status(500).send('There was a problem finding that book.');
    res.status(200).send(`${book._id} was retrieved`);
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
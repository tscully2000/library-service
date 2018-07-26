const express = require('express');
const cors = require('cors');
const LibraryController = require('./controllers/librarycontroller');
const db = require('./db');
const app = express();

app.use(cors());
app.use('/Library', LibraryController);

module.exports = app;
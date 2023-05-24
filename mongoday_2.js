const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Book = require('./bookstore');

const app = express();
app.use(bodyParser.json());

app.post('/bookstore', (req, res) => {
  const { title, author, price } = req.body;
  const book = new Book({ title, author, price });
  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(error => res.status(500).json({ error: 'ERROR SAVE BOOK' }));
});

app.get('/bookstore', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(error => res.status(500).json({ error: 'ERROR FIND BOOK' }));
});

app.get('/bookstore/:id', (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then(book => {
      if (!book) {
        res.status(404).json({ error: 'Book not found.' });
      } else {
        res.json(book);
      }
    })
    .catch(error => res.status(500).json({ error: 'ERROR' }));
});

app.put('/bookstore/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;
  Book.findByIdAndUpdate(id, { title, author, price }, { new: true })
    .then(updatedBook => {
      if (!updatedBook) {
        res.status(404).json({ error: 'Book not found.' });
      } else {
        res.json(updatedBook);
      }
    })
    .catch(error => res.status(500).json({ error: 'ERROR' }));
});

app.delete('/bookstore/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete(id)
    .then(deletedBook => {
      if (!deletedBook) {
        res.status(404).json({ error: 'Book not found.' });
      } else {
        res.json({ message: 'Book deleted' });
      }
    })
    .catch(error => res.status(500).json({ error: 'ERROR' }));
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

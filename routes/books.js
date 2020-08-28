const express = require("express");
const Book = require("../models/books");

const router = express.Router();

/**
 * get all books or search by query param
 */
router.get("/books", (req, res) => {
  let name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Book.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured in retrieving books!",
      });
    });
});

/**
 * Get Book by Id
 */
router.get("/books/:id", (req, res) => {
  let bookId = req.params.id;

  Book.findById(bookId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Book not found!",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured in retrieving books!",
      });
    });
});

/**
 * Add New Book
 */
router.post("/books", (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.author || !req.body.publishedYear) {
    res.status(400).send({ message: "Skills Name can not be empty!" });
    return;
  }

  let book = {
    name: req.body.name,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
  };

  let newBook = new Book();
  newBook.name = req.body.name;
  newBook.author = req.body.author;
  newBook.publishedYear = req.body.publishedYear;

  newBook
    .save(book)
    .then((response) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in adding new book details!",
      });
    });
});

module.exports = router;

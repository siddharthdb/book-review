const express = require("express");
const Category = require("../models/category");

const router = express.Router();

/**
 * Get list of Categories
 */
router.get("/category", (req, res) => {
  let name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Category.find(condition)
    .then((data) => {
      if (!data.length) {
        res.status(404).send({
          message: `Category list is empty!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in fetching Book Categories. Error Message: ${err.message}`,
      });
    });
});

/**
 * Add new Category
 */

router.post("/category", (req, res) => {
  if (!req.body.name || !req.body.groupName) {
    res.status(400).send({
      message: "Invalid Request. Name and Group Name are required!",
    });
    return;
  }

  let category = new Category();
  category.name = req.body.name;
  category.groupName = req.body.groupName;

  category
    .save(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in saving new Book Category",
      });
    });
});

module.exports = router;

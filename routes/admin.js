const express = require('express');
const path = require('path');

const router = express.Router();

router.get("/add-book", (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-book.html'));
});

router.post("/book", (req, res, next) => {
    console.log(res.body);
    res.redirect("/");
});

module.exports = router;
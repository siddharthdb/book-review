const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');

//config 
const { PORT, DB_URL } = require("./config");

//routes
const bookRoutes = require("./routes/books");
const categoryRoutes = require("./routes/category");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

//setup mongodb connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conneted to database!");
})

//setup routes
app.use(bookRoutes);
app.use(categoryRoutes);

console.log(`Server running on Port ${PORT || 3000}`);
app.listen(PORT || 3000);

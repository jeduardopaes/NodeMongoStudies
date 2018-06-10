const express = require('express');
const bodyParser = require('body-parser');


const mongoose = require('./db/mongoose').mongoose;
const Todo = require('./models/todo').Todo;
const User = require('./models/user').User;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    console.log("Salvando.");
    res.send(doc);
  }, (e) => {
    console.log("Unable to save.", e);
    res.status(400).send(e);
  });

});



app.listen(3000, () => {
  console.log("Started on port 3000");
});


module.exports = { app };
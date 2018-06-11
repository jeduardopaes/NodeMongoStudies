const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


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

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(400).send(err);
  });
});


app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.send('Id inválido.');
  }

  Todo.findById(id)
    .then((todo)=>{
      if(!todo){
        res.status(404).send('');
      }

      res.status(200).send(JSON.stringify(todo,undefined,2));

    }).catch((err)=>{
      console.log(err);
      res.status(400).send('');
    });

});


app.listen(3000, () => {
  console.log("Started on port 3000");
});


module.exports = { app };
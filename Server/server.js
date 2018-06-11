require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


const mongoose = require('./db/mongoose').mongoose;
const Todo = require('./models/todo').Todo;
const User = require('./models/user').User;

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    
    //console.log(`Salvo: ${doc}`)
    res.send(doc);
  }, (e) => {
    //console.log("Unable to save.");
    res.status(400).send();
  });

});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(400).send();
  });
});

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id)
    .then((todo)=>{
      if(!todo){
        res.status(404).send();
      }

      //console.log(`Encontrado: ${todo}`)
      res.status(200).send({todo});

    }).catch((err)=>{
      //console.log(err);
      res.status(400).send();
    });

});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    //console.log(`Excluido: ${todo}`)
    res.status(200).send({todo});

  }).catch((err)=>{
    res.status(400).send();
  });


});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});

  }).catch((err)=>{
    res.status(400).send();
  });

});

//=======USERS======

app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  // User.findByToken
  // user.generateAuthToken

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.status(200).header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});


module.exports = { app };
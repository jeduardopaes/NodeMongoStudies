const { ObjectID } = require('mongodb');

const { mongoose } = require('../../Server/db/mongoose');
const { Todo } = require('../../Server/models/todo');
const { User } = require('../../Server/models/user');

// var id = '5b1daf41ab58cf2d4c2313a3';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo', todo);
// });

// Todo.findById(id)
//   .then((todo) => {
//     if(!todo){
//       return console.log('Id not found.');
//     }
//     console.log('todo by id', todo);
//   }).catch((err)=>{
//     console.log(err);
//   });


var id = '5b1b42d79cf0af50e719d5ee';

User.findById(id)
  .then((user) => {
    if (!user) {
      return console.log('Usuário não encontrado.');
    }
    console.log('Usuário: ', user);
  }).catch((err) => {
    console.log(err);
  });

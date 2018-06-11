const { ObjectID } = require('mongodb');

const { mongoose } = require('../../Server/db/mongoose');
const { Todo } = require('../../Server/models/todo');
const { User } = require('../../Server/models/user');

// Todo.remove({}) - remove all
// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: '5b1dd82cbbc2715e9ea2a6e8'}).then((todo)=>{
//   console.log(todo);
// });

Todo.findByIdAndRemove('5b1dd82cbbc2715e9ea2a6e8').then((todo)=>{
  console.log(todo);
});
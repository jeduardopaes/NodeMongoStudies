var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Api');

// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 5,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: true
//   }

// });

// var newTodo = new Todo({

// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo success.', doc);
// }, (err) => {
//   console.log('Unable to save todo.', err);
// });



// ====== USER MODEL ==========

var User = mongoose.model('User',{
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  }
});

var newUser = new User({
  email: "eduardo@paes.com"
});

newUser.save().then((doc)=>{
  console.log(JSON.stringify(doc,undefined, 2));
},(err)=>{
  console.log("Não salvou.", err);
});
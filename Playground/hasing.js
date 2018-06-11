const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data={
  id: 10
};

var token = jwt.sign(data, '123ac');

console.log(token);

var decoded = jwt.verify(token, '123ac');

console.log(decoded);

// var message = 'blabla'
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data={
//   id: 4
// };

// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data)+'Somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(data)+'Somesecret').toString();

// if(resultHash === token.hash){
//   console.log('Data não foi alterado.');
// }else{
//   console.log('Data foi alterado!!!');
// }

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Tests', (err,db) =>{
  if(err){
    return console.log("Não conseguiu connectar."+err);
  }
  console.log("Conectado ao Mongodb server.");

  db.close();
});
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Tests', (err,db) =>{
  if(err){
    return console.log("Não conseguiu connectar."+err);
  }
  console.log("Conectado ao Mongodb server.");
  
  // Mostra todos os Todos que estão no BD.
  // db.collection('Todos').find().toArray().then((doc) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(doc, undefined, 2));
  // }, (err) =>{
  //   console.log("Falhou!! ", err);
  // });
  
  db.collection('Todos').find({finalizado: false}).toArray().then((doc) => {
    console.log('Todos');
    console.log(JSON.stringify(doc, undefined, 2));
  }, (err) =>{
    console.log("Falhou!! ", err);
  });
  

  //db.close();
});
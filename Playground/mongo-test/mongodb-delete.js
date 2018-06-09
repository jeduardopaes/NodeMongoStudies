// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Tests', (err,db) =>{
  if(err){
    return console.log("Não conseguiu connectar."+err);
  }
  console.log("Conectado ao Mongodb server.");
  
  // deleta vários 
  // db.collection('Todos').deleteMany({texto: 'Não ser otário.'}).then((result)=>{
  //   console.log(result);
  // });

  // deleta um só
  // db.collection('Todos').deleteOne({texto: 'Não ser otário.'}).then((result)=>{
  //   console.log(result);
  // });
  

  // encontra e deleta
  // db.collection('Todos').findOneAndDelete({finalizado: true}).then((result)=>{
  //   console.log(result);
  // });


  //db.close();
});
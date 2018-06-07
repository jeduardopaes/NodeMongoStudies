const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Tests', (err,db) =>{
  if(err){
    return console.log("Não conseguiu connectar."+err);
  }
  console.log("Conectado ao Mongodb server.");
  
  var data = {
    titulo : "Tarefa 1",
    texto: "Necessário aprender note.js com mongo para criar API's rapidamente.",
    finalizado: false
  }
  
  db.collection('Todos').insertOne(data, (err,result) => {
    if(err){
      return console.log('Não foi possivel criar tarefa.', err);
    }
    
    console.log(JSON.stringify(result.ops, undefined, 2));
    
  });

  db.close();
});
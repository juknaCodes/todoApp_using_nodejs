const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // db.collection("Todos").insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result)=> {
  //   if (err) {
  //     console.log("Unable to insert records");
  //   }
  //   console.log(JSON.stringify(result, undefined, 2));
  // })

  // db.collection("Users").insertOne({
  //   name: 'Ankuj',
  //   age: 30,
  //   location: 'Delhi'
  // }, (err, result)=> {
  //   if (err) {
  //     console.log("Unable to insert records");
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  db.collection("Todos").find().toArray().then(()=> {

  }, ()=>{

  })

  client.close();
});

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

  // db.collection("Todos").findOneAndUpdate({
  //   "_id" : new ObjectID("5b46431824af542b8c0ce88a")
  // }, {
  //   $set: { 'completed': true }
  // }, {
  //   'returnOriginal': false
  // }).then((result)=> {
  //   console.log(JSON.stringify(result, undefined, 2));
  // });

  db.collection("Users").findOneAndUpdate({
    "name" : "Ankuj"
  }, {
    $inc: { 'age': 1 }
  }, {
    'returnOriginal': false
  }).then((result)=> {
    console.log(JSON.stringify(result, undefined, 2));
  });

  //client.close();
});

const express = require('express')
const bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res)=> {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (err)=>{
    res.status(400).send(err);
  })
})

app.get("/todos", (req, res)=> {
  Todo.find().then((todos)=>{
    res.send({todos});
  },  (err)  =>{
    res.status(400).send(err);
  })
})

app.get("/todos", (req, res)=> {
  Todo.find().then((todos)=>{
    res.send({todos});
  },  (err)  =>{
    res.status(400).send(err);
  })
})

app.get("/todos/:id", (req, res)=> {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send("Id is invalid");
  }
  Todo.findById(id).then((todo)=>{
    if (!todo) {
      return res.status(404).send("user not found");
    }
    res.send({todo});
  }).catch((e)=> {
    console.log(e);
  })
});

app.listen(3000, ()=> {
  console.log("Server started at port 3000");
})

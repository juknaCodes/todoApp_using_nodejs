require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');
let PORT = process.env.PORT || 3000;

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

app.post("/users", (req, res)=> {
  let userBody = _.pick(req.body, ['email', 'password']);
  let user = new User(userBody);

  user.save().then(()=>{
    return user.generateAuthToken()
  }).then((token)=> {
    res.header('x-auth', token).send(user);
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

app.delete("/todos/:id", (req, res)=> {
  var id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).send("Id is invalid");
  }
  Todo.findByIdAndDelete(id).then((todo)=>{
    if (!todo) {
      return res.status(404).send("user not found");
    }
    res.send({todo});
  }).catch((e)=> {
    console.log(e);
  })
});

app.patch("/todos/:id", (req, res)=> {
  var id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).send("Id is invalid");
  }
  let body = _.pick(req.body, ['text','completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findByIdAndUpdate(id, { $set: body}, {new: true}).then((todo)=>{
    if (!todo) {
      return res.status(404).send("user not found");
    }
    res.send({todo});
  }).catch((e)=> {
    console.log(e);
  })
});

app.listen(PORT, ()=> {
  console.log("Server started at port 3000");
})

let isIdValid = (id)=> {
  return ObjectID.isValid(id);
}

module.exports = {app};

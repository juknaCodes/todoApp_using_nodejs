const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

var id = '5b4e28a1dea81630acb36c5311';

if (!ObjectID.isValid(id)) {
  console.log("Id is not valid");
}
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     console.log(todo)
//   } else {
//     console.log("Id not found");
//   }
// }, (err)=> {
//   console.log(error);
// })
//
// Todo.find({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     console.log(todo)
//   } else {
//     console.log("Id not found");
//   }
// }, (err)=> {
//   console.log(error);
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     console.log(todo)
//   } else {
//     console.log("Id not found");
//   }
// }, (err)=> {
//   console.log(err);
// }).catch((e)=> {console.log(e)});

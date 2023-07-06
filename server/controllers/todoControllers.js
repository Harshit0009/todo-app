const mongoose = require("mongoose");
const todoItem = require("../models/todoItem");

async function createTodoItem(req, res) {
  try {
    const item = await todoItem.create({
      item: req.body.item,
    });
    res.status(200).json(item);
  } catch (error) {
    res.json(error);
  }
}

async function getTodoItems(req, res) {
  try{
    const allTodoItems = await todoItem.find({});
    res.status(200).json(allTodoItems);
  }catch(err){
    res.json(err);
  }
}

async function updateTodoItem(req, res) {
  try{
    // finding element by it's id and updating
    const updateItem = await todoItem.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
}

async function deleteTodoItem(req, res) {
  try{
    const deleteItem = await todoItem.findByIdAndDelete(req.params.id);
    res.status(200).json("item deleted succesfully");
  }catch(err){
    res.json(err);
  }
}

module.exports = {
    createTodoItem,
    getTodoItems,
    updateTodoItem,
    deleteTodoItem,
}
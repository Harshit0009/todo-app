const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true,
    }
})

const todoItem = mongoose.model("todoItem" ,todoItemSchema);
module.exports = todoItem;
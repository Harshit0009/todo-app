const router = require("express").Router();
const { createTodoItem, getTodoItems, updateTodoItem, deleteTodoItem } = require("../controllers/todoControllers");

router.post("/api/v1/item", createTodoItem);

router.get("/api/v1/item", getTodoItems);

router.put("/api/v1/item/:id", updateTodoItem);

router.delete("/api/v1/item/:id", deleteTodoItem);

module.exports = router;

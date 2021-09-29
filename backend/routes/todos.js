const express = require("express");

const {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos.js");
const router = express.Router();
router.get("/", fetchTodos);
router.post("/", createTodo);
router.delete("/", deleteTodo);
router.patch("/", updateTodo);

module.exports = router;

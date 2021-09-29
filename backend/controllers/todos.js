const Todos = require("../models/Todos.js");
const fetchTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
};
const createTodo = async (req, res) => {
  try {
    await Todos.create({ todo: req.body.todo });
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
};
const deleteTodo = async (req, res) => {
  try {
    await Todos.findByIdAndDelete(req.body.id);
  } catch (error) {
    console.log(error.message);
  }
};
const updateTodo = async (req, res) => {
  const { id, newTodo } = req.body;
  try {
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: id },
      { todo: newTodo },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { fetchTodos, createTodo, deleteTodo, updateTodo };

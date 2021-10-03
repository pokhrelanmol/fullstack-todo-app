const Todos = require("../models/Todos.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fetchTodos = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const name = decoded.user;
    const user = await Todos.find({ username: name });
    if (user) {
      const allTodos = [];
      user.map((todo) => allTodos.push({ todo: todo.todo, id: todo._id }));
      return res.json({
        status: "ok",
        todo: allTodos,
        id: user[0]._id,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", error: "sorry you dont have any todos" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", error: "sorry you dont have any todos" });
  }
};
const createTodo = async (req, res) => {
  console.log;
  const data = req.body.data;
  const token = req.headers["x-access-token"];
  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const username = decoded.user;
    await Todos.create({ username: username, todo: data });
    res.json({ status: "ok" });
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

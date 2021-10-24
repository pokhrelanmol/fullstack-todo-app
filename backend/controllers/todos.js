const Todos = require("../models/Todos.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const RegistrationForm = require("../models/RegistrationForm.js");
let userId;
const fetchTodos = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const name = decoded.user;
    userId = await RegistrationForm.findOne({ username: name });
    if (userId) {
      const user = await Todos.find({ userId: userId._id });
      if (user) {
        const allTodos = [];
        user.map((todo) => allTodos.push({ todo: todo.todo, id: todo._id }));
        return res.json({
          status: "ok",
          todo: allTodos,
          id: user[0]._id,
        });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", error: "sorry you dont have any todos" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", error: "sorry you dont have any todos" });
  }
};
const createTodo = async (req, res) => {
  const data = req.body.data;
  const token = req.headers["x-access-token"];
  // console.log(token);

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const username = decoded.user;
    // const userId = await RegistrationForm.findOne({ username: username });

    // ! getting userId at the time of loading the page so we dont have to authenticate the user everytime
    if (userId) {
      await Todos.create({ userId: userId._id, todo: data });
      res.json({ status: "ok" });
    }
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

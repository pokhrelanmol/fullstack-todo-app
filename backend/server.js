const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todos = require("./models/Todos");
require("dotenv").config();

const PORT = process.env.PORT | 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = await Todos.find({});
  res.json(todos);
});
app.get(`/todos/:id`, async (req, res) => {
  const todo = await Todos.find({ _id: req.params.id });
  if (todo) {
    res.json(todo);
  } else {
    res.json({ message: "Not Found" });
  }
});

app.post("/todo", async (req, res) => {
  console.log(req.body);
  try {
    await Todos.create({ todo: req.body.todo });
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
});
const MONGO_URL =
  "mongodb+srv://anmol:anmol@todo-cluster.wshry.mongodb.net/todos?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server running on http//:localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err));

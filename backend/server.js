const express = require("express");
const uniqId = require("uniqid");
const app = express();
const fs = require("fs");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (data) {
      console.log(data);
      res.json(JSON.parse(data));
    } else {
      res.json({ message: "no data found" });
    }
  });
});

app.post("/todos", (req, res) => {
  if (req.body) {
    const newTodo = req.body;

    let dataBase = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    dataBase.todos.push({ todo: newTodo.todo, id: newTodo.id });
    fs.writeFileSync("todos.json", JSON.stringify(dataBase));
    res.json(newTodo);
  }
});

app.delete("/todos", (req, res) => {
  const dataBase = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
  const newFreshDataBase = dataBase.todos.filter(
    (todo) => todo.id !== req.body.idToBeDelete
  );
  const formattedData = { todos: newFreshDataBase };

  fs.writeFileSync("todos.json", JSON.stringify(formattedData));
});

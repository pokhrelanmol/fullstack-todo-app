import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqId from "uniqid";
import Modal from "./Modal";
const Todos = () => {
  const [adding, setAdding] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = React.useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [todoToBeEdited, setTodoToBeEdited] = useState("");
  useEffect(() => {
    const fetchFromServer = async () => {
      const _todos = [];
      const res = await axios.get("http://localhost:3001/todos");
      console.log(res.data);
      const todosFromServer = res.data.todos;
      todosFromServer?.map((_todo) => {
        _todos.push({ todo: _todo.todo, id: _todo.id });
      });
      setTodos(_todos);
    };
    fetchFromServer();
  }, []);
  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const todoToBePosted = { todo: newTodo, id: uniqId() };
  const handlePost = async () => {
    setAdding(true);
    try {
      axios.post("http://localhost:3001/todos", todoToBePosted);
    } catch (err) {
      console.error(err);
    }
    setTodos([...todos, todoToBePosted]);
    setNewTodo("");
    setAdding(false);
  };
  const handleDelete = (id) => {
    const remainingAfterDelete = [];
    todos.map((todo) => {
      if (todo.id !== id) {
        remainingAfterDelete.push(todo);
      }
    });
    setTodos(remainingAfterDelete);
    axios.delete("http://localhost:3001/todos", { data: { idToBeDelete: id } });
  };
  const handleEdit = (id) => {
    setModalOpen(!modalOpen);
    todos.map((todo) => {
      if (todo.id === id) {
        setTodoToBeEdited({ todo: todo.todo, id: todo.id });
      }
    });
  };
  const handleUpdate = async (newTodo, id) => {
    await todos.map((todo) => {
      if (todo.id === id) {
        todo.todo = newTodo;
      }
    });
    setModalOpen(false);
    axios.put("http://localhost:3001/todos", {
      idToBeUpdated: id,
      newTodo: newTodo,
    });
  };
  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Todos</h1>
      <input
        type="text"
        name="input"
        value={newTodo}
        onChange={handleChange}
        placeholder="Enter Todo"
      />
      <button onClick={handlePost}>post</button>
      {adding ? "Adding..." : ""}
      <ol>
        {todos?.map((todo, key) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "20%",
              marginBottom: "1rem",
            }}
          >
            <li>{todo.todo}</li>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
            <button onClick={() => handleEdit(todo.id)}>edit</button>
          </div>
        ))}
      </ol>
      <Modal
        isOpen={modalOpen}
        data={todoToBeEdited}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Todos;

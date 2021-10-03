import React, { useEffect, useState } from "react";
import { actionTypes } from "./Todos";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import "../css/todo.css";
const Todos = ({ dispatch, todos, loading }) => {
  const history = useHistory();
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  async function populateTodos() {
    const req = await axios.get("http://localhost:3001/todos", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (req.statusText === "OK") {
      const resData = await req.data.todo;
      dispatch({
        type: actionTypes.FETCH,
        payload: { data: req.data.todo, loading: false },
      });
    } else {
      alert(req.data.error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        populateTodos();
      } else {
        localStorage.removeItem("token");
        history.replace("/login");
      }
    } else {
      history.replace("/register");
    }
  }, []);
  return (
    <div className="main-container">
      <h1 className="heading">Todos</h1>
      <div className="inputs-wrapper">
        <input
          type="text"
          name="input"
          value={userInput}
          onChange={handleChange}
          placeholder="Enter Todo"
        />
        <i
          className="fas fa-plus-circle add-icon icons"
          onClick={() => {
            setUserInput("");
            dispatch({ type: actionTypes.ADD, payload: userInput });
          }}
        ></i>
        <ol>
          {loading ? "loading..." : ""}
          {todos?.map((todo, key) => (
            <div key={key} className="todos">
              <li>{todo.todo}</li>
              <div className="icons-wrapper">
                <i
                  className="fas fa-edit icons edit-icon"
                  onClick={() => {
                    dispatch({
                      type: actionTypes.EDIT,
                      payload: todo.id,
                    });
                  }}
                ></i>
                <i
                  className="fas fa-trash-alt icons delete-icon"
                  onClick={() =>
                    dispatch({
                      type: actionTypes.DELETE,
                      payload: todo.id,
                    })
                  }
                ></i>
              </div>
            </div>
          ))}
        </ol>
      </div>
      {/* <Modal isOpen={modalOpen} data={todoToBeEdited} /> */}
    </div>
  );
};

export default Todos;

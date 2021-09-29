import React, { useEffect, useState } from "react";
import { actionTypes } from "./Todos";
import Nav from "./Nav";
import "../css/todo.css";
const Todos = ({ dispatch, todos, loading }) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

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
                      payload: todo._id,
                    });
                  }}
                ></i>
                <i
                  className="fas fa-trash-alt icons delete-icon"
                  onClick={() =>
                    dispatch({ type: actionTypes.DELETE, payload: todo._id })
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

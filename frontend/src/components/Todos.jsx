import React, { useEffect, useState } from "react";
import { actionTypes } from "./Reducer";
const Todos = ({ dispatch, todos, adding }) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Todos</h1>
      <input
        type="text"
        name="input"
        value={userInput}
        onChange={handleChange}
        placeholder="Enter Todo"
      />
      <button
        onClick={() => {
          setUserInput("");
          dispatch({ type: actionTypes.ADD, payload: userInput });
        }}
      >
        post
      </button>
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
            <button
              onClick={() =>
                dispatch({ type: actionTypes.DELETE, payload: todo.id })
              }
            >
              delete
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: actionTypes.EDIT,
                  payload: todo.id,
                });
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </ol>
      {/* <Modal isOpen={modalOpen} data={todoToBeEdited} /> */}
    </div>
  );
};

export default Todos;

import React, { useReducer, useEffect } from "react";
import Todos from "./Todos";
import axios from "axios";
import uniqId from "uniqid";
import Modal from "./Modal";
export const actionTypes = {
  ADD: "ADD_TODO",
  DELETE: "DELETE_TODO",
  EDIT: "EDIT_TODO",
  UPDATE: "UPDATE_TODO",
  TOGGLE_MODAL: "TOGGLE_MODAL",
};

const initialState = {
  todos: [{ todo: "ksdk", id: "123" }],
  adding: false,
  modalOpen: false,
  todoToBeEdited: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      if (action.payload.length < 2) {
        alert("minimum length of todo should be 2");
      } else {
        const todoToBePosted = { todo: action.payload, id: uniqId() };
        axios.post("http://localhost:3001/todos", todoToBePosted);
        return {
          ...state,
          todos: [...state.todos, todoToBePosted],
        };
      }
    case actionTypes.DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case actionTypes.EDIT:
      let editTodo;
      state.todos.map((todo) => {
        if (todo.id === action.payload) {
          editTodo = todo;
        }
      });
      return {
        ...state,
        modalOpen: true,
        todoToBeEdited: editTodo,
      };
    case actionTypes.UPDATE:
      return {
        ...state,
        todos: state.todos.map((_todo) => {
          if (_todo.id === action.payload.id) {
            _todo.todo = action.payload.updatedTodo;
          }
          return _todo;
        }),
        modalOpen: false,
      };
    default:
      return state;
  }
};

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((res) => {
      console.log(res ? res : "no data found");
    });
  }, []);
  return (
    <>
      <Todos
        dispatch={dispatch}
        todos={state.todos}
        adding={state.adding}
        modalOpen={state.modalOpen}
        todoToBeEdited={state.todoToBeEdited}
      />
      <Modal
        dispatch={dispatch}
        isOpen={state.modalOpen}
        data={state.todoToBeEdited}
      />
    </>
  );
};

export default Reducer;

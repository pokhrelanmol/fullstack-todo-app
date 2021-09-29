import React, { useReducer, useEffect } from "react";
import Todos from "./Todo";
import axios from "axios";
import uniqId from "uniqid";
import Modal from "./Modal";
export const actionTypes = {
  FETCH: "FETCH_DATA",
  ADD: "ADD_TODO",
  DELETE: "DELETE_TODO",
  EDIT: "EDIT_TODO",
  UPDATE: "UPDATE_TODO",
  TOGGLE_MODAL: "TOGGLE_MODAL",
};

let initialState = {
  todos: [],
  loading: true,
  modalOpen: false,
  todoToBeEdited: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH:
      return {
        ...state,

        loading: action.payload.loading,
        todos: action.payload.data,
      };
    case actionTypes.ADD:
      if (action.payload.length < 2) {
        alert("minimum length of todo should be 2");
      } else {
        const todoToBePosted = { todo: action.payload };
        axios
          .post("http://localhost:3001/todos", todoToBePosted)
          .then(() => console.log("todo posted"));
        return {
          ...state,
          todos: [...state.todos, todoToBePosted],
        };
      }
    case actionTypes.DELETE:
      axios
        .delete("http://localhost:3001/todos", {
          data: { id: action.payload },
        })
        .then(() => alert(`todo with id ${action.payload} deleted`))
        .catch((err) => console.log(err));
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    case actionTypes.EDIT:
      let editTodo;
      state.todos.map((todo) => {
        if (todo._id === action.payload) {
          editTodo = todo;
        }
      });
      return {
        ...state,
        modalOpen: true,
        todoToBeEdited: editTodo,
      };
    case actionTypes.UPDATE:
      axios
        .patch("http://localhost:3001/todos", {
          id: action.payload.id,
          newTodo: action.payload.updatedTodo,
        })
        .then((data) => {
          console.log(data);
          alert("todo updated");
        })
        .catch((err) => console.error(err));
      return {
        ...state,
        todos: state.todos.map((_todo) => {
          if (_todo._id === action.payload.id) {
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
      dispatch({
        type: actionTypes.FETCH,
        payload: { data: res.data, loading: false },
      });
    });
  }, []);
  return (
    <>
      <Todos
        dispatch={dispatch}
        todos={state.todos}
        loading={state.loading}
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

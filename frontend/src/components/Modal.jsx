import React from "react";

const Modal = ({ isOpen, data, handleUpdate }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");
  React.useEffect(() => {
    setModalOpen(isOpen);
    setNewTodo(data.todo);
  }, [isOpen, data]);

  if (modalOpen) {
    return (
      <div
        style={{
          position: "absolute",
          inset: "0 0 0 0",
          width: "100%",
          height: "100vh",
          backgroundColor: "gray",
          opacity: "0.70",
          display: "grid",
          placeContent: "center",
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={() => handleUpdate(newTodo, data.id)}>update</button>
        <button onClick={() => setModalOpen(!modalOpen)}>cancel</button>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;

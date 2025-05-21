import React from "react";

const AddEventButton = ({ role, onClick }) => {
  if (role !== "ADMIN_ROLE") return null;
  return (
    <button
      className="add-event-btn"
      style={{ marginLeft: 16 }}
      onClick={onClick}
    >
      Agregar evento
    </button>
  );
};

export default AddEventButton;

import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

const AddEventButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      sx={{
        minWidth: "180px",              // Tamaño consistente
        height: "44px",                 // Altura fija para todos
        borderRadius: "0.75rem",        // Menos redondo
        fontWeight: 600,
        px: 3,
        color: "#fff",
        textTransform: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: "1rem",
        "&:hover": {
          backgroundColor: "#1976d2",   // Un poco más claro en hover
        },
      }}
      onClick={onClick}
    >
      Agregar evento
    </Button>
  );
};

export default AddEventButton;

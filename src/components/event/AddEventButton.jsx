import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

const AddEventButton = ({ role, onClick }) => {
  if (role !== "ADMIN_ROLE") return null;
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddCircleOutlineIcon />}
      sx={{
        borderRadius: "2rem",
        fontWeight: 700,
        px: 3,
        py: 1,
        background: "#0077a6",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        textTransform: "none",
        "&:hover": { background: "#005f86" },
        marginLeft: 2,
        fontSize: "1rem"
      }}
      onClick={onClick}
    >
      Agregar evento
    </Button>
  );
};

export default AddEventButton;
import React from "react";
import { Button } from "@mui/material";
import { canEditOrDeleteHotel } from "../../shared/validators/validateDetailsHotel";

export default function DeleteHotelButton({ role, user, hotel, onDelete, loading }) {
  if (!canEditOrDeleteHotel({ role, user, hotel })) return null;

  const handleClick = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este hotel?")) return;
    if (onDelete) await onDelete();
  };

  return (
    <Button
      variant="contained"
      color="error"
      sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2 }}
      onClick={handleClick}
      disabled={loading}
    >
      Eliminar
    </Button>
  );
}

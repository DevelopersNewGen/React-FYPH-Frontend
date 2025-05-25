import React from "react";
import { Button } from "@mui/material";
import { canEditOrDeleteHotel } from "../../shared/validators/validateDetailsHotel";

export default function EditHotelButton({ role, user, hotel, onEdit, loading }) {
  if (!canEditOrDeleteHotel({ role, user, hotel })) return null;

  return (
    <Button
      variant="contained"
      color="warning"
      sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2 }}
      onClick={onEdit}
      disabled={loading}
    >
      Editar
    </Button>
  );
}

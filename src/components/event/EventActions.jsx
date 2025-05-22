import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEventActions } from "../../shared/hooks/useEventActions";

export default function EventActions({ event, onEventUpdated, onEventDeleted, role }) {
  const { handleUpdateEvent, handleDeleteEvent, loading } = useEventActions();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: event.name,
    description: event.description,
    date: event.date?.slice(0, 10) || "",
    time: event.time,
    location: event.location,
    category: event.category,
    cost: event.cost,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const ok = await handleUpdateEvent(event.eid, editData);
    if (ok) {
      onEventUpdated && onEventUpdated();
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que deseas eliminar este evento?")) {
      const ok = await handleDeleteEvent(event.eid);
      if (ok) onEventDeleted && onEventDeleted();
    }
  };

  if (role !== "ADMIN_ROLE") return null;

  return (
    <>
      <Button size="small" onClick={handleOpen}>Editar</Button>
      <Button size="small" color="error" onClick={handleDelete}>Eliminar</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Evento</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <TextField label="Nombre" name="name" fullWidth margin="dense" value={editData.name} onChange={handleEditChange} />
            <TextField label="Descripción" name="description" fullWidth margin="dense" value={editData.description} onChange={handleEditChange} />
            <TextField label="Fecha" name="date" type="date" fullWidth margin="dense" value={editData.date} onChange={handleEditChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Hora" name="time" type="time" fullWidth margin="dense" value={editData.time} onChange={handleEditChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Ubicación" name="location" fullWidth margin="dense" value={editData.location} onChange={handleEditChange} />
            <TextField label="Categoría" name="category" fullWidth margin="dense" value={editData.category} onChange={handleEditChange} />
            <TextField label="Costo" name="cost" type="number" fullWidth margin="dense" value={editData.cost} onChange={handleEditChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>Guardar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
import React from "react";
import { useHotelEdit } from "../../shared/hooks/useHotelEdit";
import {
  Box, TextField, Button, Typography, CircularProgress, Stack, Paper
} from "@mui/material";

function useEditHotelForm(hotel, onSuccess, onClose) {
  const [form, setForm] = React.useState({
    name: hotel?.name || "",
    description: hotel?.description || "",
    address: hotel?.address || "",
    telephone: hotel?.telephone || "",
  });
  const { editHotel, loading, error, success, setError, setSuccess } = useHotelEdit();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const hotelId = hotel._id || hotel.id || hotel.hid;
    if (!hotelId) {
      setError("No se encontró el ID del hotel.");
      return;
    }
    const res = await editHotel(hotelId, form);
    if (res && res.success && onSuccess) onSuccess();
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
    setError,
    setSuccess,
    onClose
  };
}

export default function EditHotel({ hotel, onClose, onSuccess, setRefetchKey }) {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    success
  } = useEditHotelForm(hotel, onSuccess, onClose);

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: 400, ml: 4 }}>
      <Typography variant="h6" gutterBottom>Editar hotel</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            minRows={2}
          />
          <TextField
            label="Dirección"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Teléfono"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            fullWidth
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Guardar cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}

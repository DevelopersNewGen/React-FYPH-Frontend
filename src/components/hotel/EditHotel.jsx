import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import { useHotelEdit } from "../../shared/hooks/useHotelEdit";

export default function EditHotelModal({ hotel, onClose, onSuccess }) {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({
    name: hotel?.name || "",
    description: hotel?.description || "",
    address: hotel?.address || "",
    telephone: hotel?.telephone || "",
  });

  const { editHotel, loading, error, success, setError, setSuccess } = useHotelEdit();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const hotelId = hotel._id || hotel.id || hotel.hid;
    if (!hotelId) {
      setError("No se encontró el ID del hotel.");
      return;
    }
    const res = await editHotel(hotelId, form);
    if (res && res.success) {
      onSuccess && onSuccess();
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.5)",
          maxHeight: "80vh",
          color: "white",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          animation: "fadeIn 0.3s ease",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
            zIndex: (theme) => theme.zIndex.modal + 1000
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Editar hotel</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            overflow: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pb: 2,
          }}
        >
          <TextField
            label="Nombre"
            name="name"
            fullWidth
            margin="dense"
            value={form.name}
            onChange={handleChange}
            className="section-input"
            required
          />
          <TextField
            label="Descripción"
            name="description"
            fullWidth
            margin="dense"
            multiline
            minRows={2}
            value={form.description}
            onChange={handleChange}
            className="section-input"
            required
          />
          <TextField
            label="Dirección"
            name="address"
            fullWidth
            margin="dense"
            value={form.address}
            onChange={handleChange}
            className="section-input"
            required
          />
          <TextField
            label="Teléfono"
            name="telephone"
            fullWidth
            margin="dense"
            value={form.telephone}
            onChange={handleChange}
            className="section-input"
            required
          />

          {error && (
            <Typography
              color="error"
              sx={{ mt: 1, fontWeight: "medium", fontSize: 14 }}
            >
              {error}
            </Typography>
          )}
          {success && (
            <Typography
              color="success.main"
              sx={{ mt: 1, fontWeight: "medium", fontSize: 14 }}
            >
              {success}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2}>
            <Button
              className="section-button"
              onClick={handleClose}
              disabled={loading}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              className="section-button"
              type="submit"
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              Guardar
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useUser, useRoomUpdate } from '../../shared/hooks';
import RoomAdd from './RoomAdd';

export default function RoomEdit({ roomData, onClose, hideImages, onlyImages }) {
  const [open, setOpen] = useState(true);
  const { role } = useUser();
  const { handleUpdateRoom, handleUpdateRoomImages } = useRoomUpdate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) setError("");
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose(false); // false para indicar que no se actualizó
  };

  const onSubmit = async (dataOrFormData) => {
    setLoading(true);
    setError("");
    try {
      const roomId = roomData?.rid || roomData?._id;
      if (!roomId) {
        setError("No se encontró el ID de la habitación.");
        setLoading(false);
        return;
      }

      if (onlyImages) {
        await handleUpdateRoomImages(roomId, dataOrFormData);
      } else {
        await handleUpdateRoom(roomId, dataOrFormData);
      }

      setLoading(false);
      setOpen(false);
      if (onClose) onClose(true); // true para indicar que se actualizó
    } catch (err) {
      setError("Hubo un error al actualizar la habitación.");
      setLoading(false);
    }
  };

  if (!roomData) return <div>Cargando...</div>;
  if (role !== "ADMIN_ROLE" && role !== "HOST_ROLE") {
    return <div>No tienes permisos para editar esta habitación.</div>;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.5)",
          maxHeight: "80vh",
          color: "white !important",
          overflowY: "auto",
          animation: "fadeIn 0.3s ease",
          gap: 4,
          p: 4,
          maxWidth: "1000px",
          mx: "auto",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",

          // Ocultar scroll pero mantener funcionalidad
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none",       // Chrome, Safari
  },

  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}
      }}
    > <DialogContent>
        <RoomAdd
          initialData={roomData}
          onSubmit={onSubmit}
          isEdit
          onCancel={handleClose}
          hideImages={hideImages}
          onlyImages={onlyImages}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

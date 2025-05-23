import { useState } from "react";
import { updateRoom, updateRoomImages } from "../../services/api";

export function useRoomUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateRoom = async (rid, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateRoom(rid, data);
      if (res.error) throw new Error(res.e?.message || "Error al actualizar habitación");
      setSuccess(true);
      return res.data;
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoomImages = async (rid, formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateRoomImages(rid, formData);
      if (res.error) throw new Error(res.e?.message || "Error al actualizar imágenes");
      setSuccess(true);
      return res.data;
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleUpdateRoom,
    handleUpdateRoomImages,
  };
}
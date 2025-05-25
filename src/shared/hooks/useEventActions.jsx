import { useState } from "react";
import { updateEvent, deleteEvent } from "../../services";
import toast from "react-hot-toast";

export function useEventActions() {
  const [loading, setLoading] = useState(false);

  const handleUpdateEvent = async (eid, data) => {
    setLoading(true);
    const response = await updateEvent(eid, data);
    setLoading(false);
    if (response.error) {
      toast.error(response.e?.response?.data?.message || "Error al actualizar evento");
      return false;
    }
    toast.success(response.data?.message || "Evento actualizado");
    return true;
  };

  const handleDeleteEvent = async (eid) => {
    setLoading(true);
    const response = await deleteEvent(eid);
    setLoading(false);
    if (response.error) {
      toast.error(response.e?.response?.data?.message || "Error al eliminar evento");
      return false;
    }
    toast.success(response.data?.message || "Evento eliminado");
    return true;
  };

  return { handleUpdateEvent, handleDeleteEvent, loading };
}
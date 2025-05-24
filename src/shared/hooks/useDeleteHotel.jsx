import { useState } from "react";
import { deleteHotel } from "../../services/api"; 

export function useDeleteHotel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const removeHotel = async (hid) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await deleteHotel(hid);
      if (res.success) {
        setSuccess("Hotel eliminado correctamente");
        return { success: true, data: res };
      } else {
        setError(res.msg || "No se pudo eliminar el hotel");
        return { success: false, error: res.msg || "No se pudo eliminar el hotel" };
      }
    } catch (err) {
      setError(err?.response?.data?.msg || "Error al eliminar el hotel");
      return { success: false, error: err?.response?.data?.msg || "Error al eliminar el hotel" };
    } finally {
      setLoading(false);
    }
  };

  return { removeHotel, loading, error, success, setError, setSuccess };
}

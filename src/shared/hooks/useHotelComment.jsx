import { useState } from "react";
import { addHotelComment } from "../../services/api"; 

export function useHotelComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const commentHotel = async (hid, data) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await addHotelComment(hid, data);
      if (res.success) {
        setSuccess("Comentario y calificación enviados correctamente");
        return { success: true, data: res };
      } else {
        setError(res.msg || "No se pudo enviar el comentario");
        return { success: false, error: res.msg || "No se pudo enviar el comentario" };
      }
    } catch (err) {
      setError(err?.response?.data?.msg || "Error al enviar el comentario");
      return { success: false, error: err?.response?.data?.msg || "Error al enviar el comentario" };
    } finally {
      setLoading(false);
    }
  };

  return { commentHotel, loading, error, success, setError, setSuccess };
}

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

import { useState } from "react";
import { deleteReservation } from "../../services";

export function useReservationDelete() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const removeReservation = async (rid) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
        const res = await deleteReservation(rid);
        if (res.success) {
            setSuccess("Reserva eliminada correctamente");
            return { success: true, data: res };
        } else {
            setError(res.msg || "No se pudo eliminar la reserva");
            return { success: false, error: res.msg || "No se pudo eliminar la reserva" };
        }
        } catch (err) {
        setError(err?.response?.data?.msg || "Error al eliminar la reserva");
        return { success: false, error: err?.response?.data?.msg || "Error al eliminar la reserva" };
        } finally {
        setLoading(false);
        }
    };

    return { removeReservation, loading, error, success, setError, setSuccess };
}
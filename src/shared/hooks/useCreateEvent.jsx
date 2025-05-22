import { useState } from "react";
import { createEvent as createEventApi } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateEvent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createEvent = async (eventData) => {
    setIsLoading(true);
    const response = await createEventApi(eventData);
    setIsLoading(false);

    if (response.error) {
      toast.error(response.e?.response?.data?.message || "Error al crear evento");
      return;
    }

    if (response.data?.success) {
      toast.success(response.data.message || "Evento creado correctamente");
      navigate("/eventos");
    } else {
      toast.error(response.data?.message || "Error al crear evento");
    }
  };

  return { createEvent, isLoading };
}
import { useState } from "react";
import { createEvent as createEventApi } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateEvent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 const createEvent = async (eventData) => {
  setIsLoading(true);
  try {
    const response = await createEventApi(eventData);
    console.log("Respuesta del backend:", response); 
    setIsLoading(false);
    if (response?.data?.success) {
      toast.success(response.data.message || "Evento creado correctamente");
      navigate("/eventos");
    } else {
      const msg = response?.data?.message || "Error desconocido al crear evento";
      toast.error(msg);
    }
  } catch (error) {
    setIsLoading(false);
    const msg =
      error?.response?.data?.message || "Error inesperado al crear evento";
    toast.error(msg);
  }
};
  return { createEvent, isLoading };
}

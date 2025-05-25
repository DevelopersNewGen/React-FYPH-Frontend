import { useState } from "react";
import toast from "react-hot-toast";
import { getClientsHost as Clients } from "../../services";

export const useUserHost = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const data = await Clients();
      setClients(data.data.users);
    } catch (err) {
      toast.error("Error al cargar usuarios: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    clients,
    isLoading,
    loadClients,
  };
};
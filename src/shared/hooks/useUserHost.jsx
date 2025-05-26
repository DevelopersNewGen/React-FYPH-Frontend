import { useState } from "react";
import toast from "react-hot-toast";
import { getClientsHost as fetchClientsHost } from "../../services";

export const useUserHost = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClientsHost();
      setClients(response?.data?.users || []);
    } catch (err) {
      toast.error("Error al cargar los clientes: " + err.message);
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

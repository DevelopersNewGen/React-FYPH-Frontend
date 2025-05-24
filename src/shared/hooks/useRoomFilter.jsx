import { useState } from "react";
import { filterRooms } from "../../services/api";

export function useRoomFilter() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFilteredRooms = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const res = await filterRooms(filters);
      if (res.error) throw new Error(res.e?.message || "Error al filtrar habitaciones");
      setRooms(res.data.rooms);
    } catch (err) {
      setError(err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return { rooms, loading, error, fetchFilteredRooms };
}
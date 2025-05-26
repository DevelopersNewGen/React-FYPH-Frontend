import { useState, useMemo, useEffect } from "react";
import { getEvents } from "../../services/api.jsx";

const CATEGORIES = ["todos", "weding", "party", "business", "other"];

export function useEventFilter() {
  const [filter, setFilter] = useState("todos");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data.data?.events || []);
    } catch (error) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  fetchEvents();
}, []);

  const eventosFiltrados = useMemo(() => {
    if (filter === "todos") return events;
    return events.filter((e) => e.category === filter);
  }, [filter, events]);

  return { filter, setFilter, eventosFiltrados, loading, categorias: CATEGORIES };
}
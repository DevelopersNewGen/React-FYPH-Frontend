import { useState, useMemo, useEffect } from "react";
import { getEvents } from "../../services/api.jsx";

export function useEventFilter() {
  const [filter, setFilter] = useState("todos");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.events || []);
      } catch (error) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const eventosFiltrados = useMemo(() => {
    if (filter === "reservados") return events.filter((e) => e.reservado);
    if (filter === "no-reservados") return events.filter((e) => !e.reservado);
    return events;
  }, [filter, events]);

  return { filter, setFilter, eventosFiltrados, loading };
}
import { useState, useMemo } from "react";

const mockEvents = [
  { id: 1, nombre: "Evento 1", reservado: true },
  { id: 2, nombre: "Evento 2", reservado: false },
  { id: 3, nombre: "Evento 3", reservado: true },
  { id: 4, nombre: "Evento 4", reservado: false },
];

export function useEventFilter() {
  const [filter, setFilter] = useState("todos");

  const eventosFiltrados = useMemo(() => {
    if (filter === "reservados") return mockEvents.filter((e) => e.reservado);
    if (filter === "no-reservados")
      return mockEvents.filter((e) => !e.reservado);
    return mockEvents;
  }, [filter]);

  return { filter, setFilter, eventosFiltrados };
}

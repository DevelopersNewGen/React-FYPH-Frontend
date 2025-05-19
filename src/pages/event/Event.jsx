import React from "react";
import { useEventFilter } from "../../shared/hooks/useEventFilter.jsx";
import { EventList } from "../../components/event/EventList.jsx";
import ResponsiveAppBar from "../../components/Navbar.jsx";
import "./event.css";

const Event = () => {
  const { filter, setFilter, eventosFiltrados, loading, categorias } = useEventFilter();

  return (
    <>
      <ResponsiveAppBar />
      <div className="event-page-wrapper">
        <div className="event-filter">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="event-select"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "todos"
                  ? "Todas las categorías"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Cargando eventos...</div>
        ) : (
          <EventList eventos={eventosFiltrados} />
        )}
      </div>
    </>
  );
};

export default Event;
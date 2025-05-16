import React from "react";
import { useEventFilter } from "../../shared/hooks/useEventFilter.jsx";
import { EventList } from "../../components/event/EventList.jsx";
import ResponsiveAppBar from "../../components/Navbar.jsx";
import "./event.css";

const Event = () => {
  const { filter, setFilter, eventosFiltrados } = useEventFilter();

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
            <option value="todos">Todos</option>
            <option value="reservados">Reservados</option>
            <option value="no-reservados">No reservados</option>
          </select>
        </div>
        <EventList eventos={eventosFiltrados} />
      </div>
    </>
  );
};

export default Event;
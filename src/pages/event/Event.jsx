import React from "react";
import { useEventFilter } from "../../shared/hooks/useEventFilter.jsx";
import { EventList } from "../../components/event/EventList.jsx";
import ResponsiveAppBar from "../../components/Navbar.jsx";
import AddEventButton from "../../components/event/AddEventButton.jsx";
import { useNavigate } from "react-router-dom";
import "./event.css";

const Event = () => {
  const { filter, setFilter, eventosFiltrados, loading, categorias } =
    useEventFilter();
  const navigate = useNavigate();
  const role = "USER_ROLE";

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
          <AddEventButton
            role={role}
            onClick={() => navigate("/eventos/nuevo")}
          />
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

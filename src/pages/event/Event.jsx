import React from "react";
import { useEventFilter } from "../../shared/hooks/useEventFilter.jsx";
import { EventList } from "../../components/event/EventList.jsx";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import AddEventButton from "../../components/event/AddEventButton.jsx";
import EventListAdmin from "../../components/event/EventListAdmin.jsx";
import { useNavigate } from "react-router-dom";
import "./event.css";

const Event = () => {
  const { filter, setFilter, eventosFiltrados, loading, categorias, refetch } = useEventFilter();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || null;

  const handleEventUpdated = () => refetch && refetch();
  const handleEventDeleted = () => refetch && refetch();

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
        ) : role === "ADMIN_ROLE" ? (
          <EventListAdmin eventos={eventosFiltrados} />
        ) : (
          <EventList
            eventos={eventosFiltrados}
            onEventUpdated={handleEventUpdated}
            onEventDeleted={handleEventDeleted}
            role={role}
          />
        )}
      </div>
    </>
  );
};

export default Event;
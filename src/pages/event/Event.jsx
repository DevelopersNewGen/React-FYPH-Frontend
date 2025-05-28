import React from "react";
import { useEventFilter } from "../../shared/hooks/useEventFilter.jsx";
import { EventList } from "../../components/event/EventList.jsx";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import EventListAdmin from "../../components/event/EventListAdmin.jsx";
import { useNavigate } from "react-router-dom";
import AddEventButton from "../../components/event/AddEventButton.jsx";
import "./event.css";
import { useUser } from "../../shared/hooks";

const Event = () => {
  const { filter, setFilter, eventosFiltrados, loading, categorias } =
    useEventFilter();
  const navigate = useNavigate();
  const { role } = useUser();

  return (
    <>
      <ResponsiveAppBar role={role} />
      <div className="event-page-wrapper">
        <div
          style={{
            position: "fixed",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            background: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "2rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
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
          <AddEventButton onClick={() => navigate("/eventos/nuevo")} />
        </div>

        {loading ? (
          <div>Cargando eventos...</div>
        ) : role === "ADMIN_ROLE" ? (
          <EventListAdmin eventos={eventosFiltrados} />
        ) : (
          <EventList eventos={eventosFiltrados} />
        )}
      </div>
    </>
  );
};

export default Event;
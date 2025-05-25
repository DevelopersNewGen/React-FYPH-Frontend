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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
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
          <EventList eventos={eventosFiltrados} />
        )}
      </div>
    </>
  );
};

export default Event;
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

      {/* Filtros flotantes */}
      <div
        style={{
          position: "fixed",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          gap: 12,
          padding: "0.8rem 1.5rem",
          borderRadius: "1rem",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="event-select"
          style={{
            minWidth: "180px",
            height: "44px",
            borderRadius: "0.75rem",
            border: "2px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(21, 101, 192, 0.85)", // azul suave
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer",
            padding: "0 1rem",
            appearance: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(25, 118, 210, 0.85)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(21, 101, 192, 0.85)")
          }
        >
          {categorias.map((cat) => (
            <option
              key={cat}
              value={cat}
              style={{ color: "#000", backgroundColor: "#fff" }} // dropdown blanco
            >
              {cat === "todos"
                ? "Todas las categorías"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <AddEventButton onClick={() => navigate("/eventos/nuevo")} />
      </div>

      {/* Contenido principal */}
      <div className="event-page-wrapper" style={{ paddingTop: "6px" }}>
        {loading ? (
          <div style={{ color: "#fff", textAlign: "center" }}>
            Cargando eventos...
          </div>
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

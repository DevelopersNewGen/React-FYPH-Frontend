import PropTypes from "prop-types";
import { EventCard } from "./EventCard.jsx";

export function EventList({ eventos, onEventUpdated, onEventDeleted, role }) {
  return (
    <div
      className="event-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "0.5rem", 
        justifyItems: "center",
        width: "100%",
        padding: "0 2rem",
      }}
    >
      {eventos.map((evento) => (
        <EventCard
          key={evento.eid}
          {...evento}
          onEventUpdated={onEventUpdated}
          onEventDeleted={onEventDeleted}
          role={role}
        />
      ))}
    </div>
  );
}

EventList.propTypes = {
  eventos: PropTypes.array.isRequired,
  onEventUpdated: PropTypes.func,
  onEventDeleted: PropTypes.func,
  role: PropTypes.string,
};

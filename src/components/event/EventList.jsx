import PropTypes from "prop-types";
import { EventCard } from "./EventCard.jsx";
import EventActions from "./EventActions.jsx";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function EventList({ eventos, onEventUpdated, onEventDeleted, role }) {
  const filas = chunkArray(eventos, 3);

  return (
    <div className="event-list">
      {filas.map((fila, idx) => (
        <div key={idx} style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "center" }}>
          {fila.map((evento) => (
            <div key={evento.eid}>
              <EventCard {...evento} />
              <EventActions
                event={evento}
                onEventUpdated={onEventUpdated}
                onEventDeleted={onEventDeleted}
                role={role}
              />
            </div>
          ))}
        </div>
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
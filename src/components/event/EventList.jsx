import PropTypes from "prop-types";
import { EventCard } from "./EventCard.jsx";
import EventActions from "./EventActions.jsx";

export function EventList({ eventos, onEventUpdated, onEventDeleted, role }) {
  return (
    <div className="event-list">
      {eventos.map((evento) => (
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
  );
}

EventList.propTypes = {
  eventos: PropTypes.array.isRequired,
  onEventUpdated: PropTypes.func,
  onEventDeleted: PropTypes.func,
  role: PropTypes.string,
};
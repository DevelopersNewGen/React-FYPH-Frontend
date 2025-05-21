import PropTypes from "prop-types";
import { EventCard } from "./EventCard.jsx";

export function EventList({ eventos }) {
  return (
    <div className="event-list">
      {eventos.map((evento) => (
        <EventCard key={evento.eid} {...evento} />
      ))}
    </div>
  );
}

EventList.propTypes = {
  eventos: PropTypes.array.isRequired,
};
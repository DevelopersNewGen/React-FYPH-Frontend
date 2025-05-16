import PropTypes from "prop-types";
import { EventCard } from "./EventCard.jsx";

export function EventList({ eventos }) {
  return (
    <>
      {eventos.map((evento) => (
        <EventCard key={evento.id} {...evento} />
      ))}
    </>
  );
}

EventList.propTypes = {
  eventos: PropTypes.array.isRequired,
};

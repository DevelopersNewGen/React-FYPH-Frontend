import CardMedia from "@mui/material/CardMedia";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";
import EventActions from "./EventActions"; // Importa los botones

export function EventDetailContent({
  evento,
  mainImage,
  setMainImage,
  getPreviewImages,
  onBack,
  role,
  onEventUpdated,
  onEventDeleted,
}) {
  return (
    <div className="event-detail-container">
      <button className="back-button" onClick={onBack}>
        <ArrowBackIosNewIcon fontSize="small" />
      </button>
      <div className="event-left">
        <div>
          <h1 className="event-title">{evento.name}</h1>
          <p className="event-location">
            <LocationOnIcon fontSize="small" /> {evento.location}
          </p>
        </div>
        <div className="event-options">
          <p>
            <DescriptionIcon fontSize="small" /> <b>Descripción:</b> {evento.description}
          </p>
          <p>
            <CalendarMonthIcon fontSize="small" /> <b>Fecha:</b>{" "}
            {evento.date ? new Date(evento.date).toLocaleDateString() : "-"}
          </p>
          <p>
            <AccessTimeIcon fontSize="small" /> <b>Hora:</b> {evento.time}
          </p>
          <p>
            <CategoryIcon fontSize="small" /> <b>Categoría:</b> {evento.category}
          </p>
          <p>
            <AttachMoneyIcon fontSize="small" /> <b>Costo:</b>{" "}
            {evento.cost ? `$${evento.cost}` : "Gratis"}
          </p>
          {/* Botones debajo de costo */}
          {role === "ADMIN_ROLE" && (
            <EventActions
              event={evento}
              onEventUpdated={onEventUpdated}
              onEventDeleted={onEventDeleted}
              role={role}
            />
          )}
        </div>
      </div>
      <div className="event-right">
        <CardMedia
          component="img"
          image={mainImage}
          alt="imagen principal"
          className="event-images-main"
        />
        <div className="event-images-preview">
          {getPreviewImages().map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`img-${idx}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

EventDetailContent.propTypes = {
  evento: PropTypes.object.isRequired,
  mainImage: PropTypes.string.isRequired,
  setMainImage: PropTypes.func.isRequired,
  getPreviewImages: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  role: PropTypes.string,
  onEventUpdated: PropTypes.func,
  onEventDeleted: PropTypes.func,
};
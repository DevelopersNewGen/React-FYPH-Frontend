import React, { useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";

export function RoomDetails({ room, onBack }) {
  const [mainImage, setMainImage] = useState(room?.images?.[0] || "");

  const getPreviewImages = () =>
    room.images?.filter((img) => img !== mainImage) || [];

  if (!room) return null;

  return (
    <div className="room-detail-container">
      <button className="back-button" onClick={onBack}>
        <ArrowBackIosNewIcon fontSize="small" />
      </button>
      <div className="room-left">
        <div>
          <h1 className="room-title">{room.name}</h1>
          <p className="room-location">
            <LocationOnIcon fontSize="small" /> {room.location}
          </p>
        </div>
        <div className="room-options">
          <p>
            <DescriptionIcon fontSize="small" /> <b>Descripción:</b> {room.description}
          </p>
          <p>
            <CategoryIcon fontSize="small" /> <b>Tipo:</b> {room.type}
          </p>
          <p>
            <b>Capacidad:</b> {room.capacity}
          </p>
          <p>
            <AttachMoneyIcon fontSize="small" /> <b>Precio:</b> Q{room.pricePerDay} / noche
          </p>
          <p>
            <b>Estado:</b>{" "}
            <span className={room.status === "available" ? "room-status-available" : "room-status-unavailable"}>
              {room.status === "available" ? "Disponible" : "No disponible"}
            </span>
          </p>
        </div>
      </div>
      <div className="room-right">
        {mainImage && (
          <CardMedia
            component="img"
            image={mainImage}
            alt="Imagen principal"
            className="room-images-main"
          />
        )}
        <div className="room-images-preview">
          {getPreviewImages().map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`img-${idx}`}
              onClick={() => setMainImage(img)}
              className={img === mainImage ? "room-image-selected" : ""}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 8,
                cursor: "pointer",
                border: img === mainImage ? "2px solid #1976d2" : "1px solid #ccc",
                marginRight: 8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

RoomDetails.propTypes = {
  room: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default RoomDetails;
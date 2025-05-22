import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";

export function RoomDetails({ room, onBack }) {
  if (!room || !room.images || room.images.length === 0) return null;

  const [mainImage, setMainImage] = useState(room.images[0]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const getPreviewImages = () => room.images.filter((img) => img !== mainImage);


  const handleEdit = () => {
    navigate(`/habitaciones/editar/${room.rid || room._id}`);
  };

  const handleDelete = () => {

    alert("¿Seguro que deseas eliminar esta habitación?");
  };

  return (
    <div className="room-detail-container">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>
      <div className="room-left">
        <div>
          <h1 className="room-title">{room.numRoom}</h1>
        </div>
        <div className="room-options">
          <p>
            <DescriptionIcon fontSize="small" /> <b>Descripción:</b> {room.description}
          </p>
          <p>
            <CategoryIcon fontSize="small" /> <b>Tipo:</b> {room.type}
          </p>
          <p>
            <AttachMoneyIcon fontSize="small" /> <b>Precio:</b> Q{room.pricePerDay} / noche
          </p>
          <p>
            <b>Capacidad:</b> {room.capacity}
          </p>
          <p>
            <b>Estado:</b>{" "}
            <span className={room.status ? "room-status-available" : "room-status-unavailable"}>
              {room.status ? "Disponible" : "No disponible"}
            </span>
          </p>
          {/* Botones solo para ADMIN_ROLE o HOST_ROLE */}
          {(role === "ADMIN_ROLE" || role === "HOST_ROLE") && (
            <div style={{ marginTop: 16 }}>
              <button onClick={handleEdit} style={{ marginRight: 8 }}>
                Editar
              </button>
              <button onClick={handleDelete} style={{ background: "#d32f2f", color: "#fff" }}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="room-right">
        <CardMedia
          component="img"
          image={mainImage}
          alt="imagen principal"
          className="room-images-main"
        />
        <div className="room-images-preview">
          {getPreviewImages().map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`img-${idx}`}
              onClick={() => setMainImage(img)}
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
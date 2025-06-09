import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useRoomDetails } from "../../shared/hooks";
import RoomEdit from "./RoomEdit";
import { useReservationsByRoom } from "../../shared/hooks/useReservationByRoom";

export default function RoomDetails({ rid, onBack, role }) {
  const [mainImage, setMainImage] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showEditImages, setShowEditImages] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  const { room, loading } = useRoomDetails({ rid, refresh });

  useEffect(() => {
    if (room && room.images && room.images.length > 0) {
      setMainImage(room.images[0]);
    }
  }, [room]);

  const getPreviewImages = () => room.images?.filter((img) => img !== mainImage) || [];

  const handleEdit = () => setShowEdit(true);
  const handleEditImages = () => setShowEditImages(true);

  const handleCloseEdit = () => {
    setShowEdit(false);
    setRefresh(r => r + 1);
  };

  const handleCloseEditImages = () => {
    setShowEditImages(false);
    setRefresh(r => r + 1);
  };

  if (loading) return <div>Cargando...</div>;
  if (!room) return <div>No se encontró la habitación.</div>;

  return (
    <div style={{ padding: "24px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#e0e0e0",
          border: "none",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
        Volver
      </button>

      <div style={{
        display: "flex",
        gap: "40px",
        alignItems: "flex-start",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          background: "#0c5c82",
          borderRadius: "16px",
          padding: "24px",
          color: "#fff",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}>
          <h1 style={{ margin: "0 0 12px 0" }}>{room.numRoom}</h1>
          <p><DescriptionIcon fontSize="small" /> <b>Descripción:</b> {room.description}</p>
          <p><CategoryIcon fontSize="small" /> <b>Tipo:</b> {room.type}</p>
          <p><AttachMoneyIcon fontSize="small" /> <b>Precio:</b> Q{room.pricePerDay} / noche</p>
          <p><b>Capacidad:</b> {room.capacity}</p>
          <p>
            <b>Estado:</b>{" "}
            <span style={{ color: room.status ? "lightgreen" : "red" }}>
              {room.status ? "Disponible" : "No disponible"}
            </span>
          </p>

          {(role === "ADMIN_ROLE" || role === "HOST_ROLE") && (
            <div style={{ marginTop: 16 }}>
              <button onClick={handleEdit} style={{ marginRight: 8 }}>
                Editar datos
              </button>
              <button onClick={handleEditImages} style={{ marginRight: 8 }}>
                Editar imágenes
              </button>
              <button
              style={{ marginTop: 16 }}
              onClick={() => navigate(`/reservaciones/habitacion/${room.rid}`)}
            >
              Ver historial de reservaciones
              </button>
            </div>
          )}

          {role === "CLIENT_ROLE" && (
            <div style={{ marginTop: 16 }}>
              <button
                style={{ background: "#1976d2", color: "#fff", padding: "8px 16px", borderRadius: 8 }}
                onClick={() => navigate(`/reservacion/${room.rid}`)}
              >
                Reservar
              </button>
            </div>
          )}
          
        </div>

        <div style={{ flex: 1 }}>
          <CardMedia
            component="img"
            image={mainImage}
            alt="imagen principal"
            style={{
              width: "100%",
              height: 280,
              objectFit: "cover",
              borderRadius: "16px",
              marginBottom: "12px"
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {getPreviewImages().map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`img-${idx}`}
                onClick={() => setMainImage(img)}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: img === mainImage ? "2px solid #1976d2" : "1px solid #ccc",
                  transition: "transform 0.2s"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal open={showEdit} onClose={handleCloseEdit}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 600,
          maxWidth: 700
        }}>
          <RoomEdit roomData={room} onClose={handleCloseEdit} hideImages />
        </Box>
      </Modal>

      <Modal open={showEditImages} onClose={handleCloseEditImages}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 400,
          maxWidth: 600
        }}>
          <RoomEdit roomData={room} onClose={handleCloseEditImages} onlyImages />
        </Box>
      </Modal>
    </div>
  );
}

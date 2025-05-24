import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useUser, useRoomDetails } from "../../shared/hooks";
import RoomEdit from "./RoomEdit";

export default function RoomDetails({ rid, onBack , role}) {
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
    <div style={{ display: "flex", gap: 32 }}>
      <div className="room-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
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
            {(role === "ADMIN_ROLE" || role === "HOST_ROLE") && (
              <div style={{ marginTop: 16 }}>
                <button onClick={handleEdit} style={{ marginRight: 8 }}>
                  Editar datos
                </button>
                <button onClick={handleEditImages} style={{ marginRight: 8 }}>
                  Editar imágenes
                </button>
              </div>
            )}
            <div style={{ marginTop: 16 }}>
              <button
                style={{ background: "#1976d2", color: "#fff" }}
                onClick={() => navigate(`/reservacion/${room.rid}`)}
              >
                Reservar
              </button>
            </div>
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
      <Modal
        open={showEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-editar-habitacion"
        aria-describedby="modal-editar-habitacion-descripcion"
      >
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
      <Modal
        open={showEditImages}
        onClose={handleCloseEditImages}
        aria-labelledby="modal-editar-imagenes"
        aria-describedby="modal-editar-imagenes-descripcion"
      >
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
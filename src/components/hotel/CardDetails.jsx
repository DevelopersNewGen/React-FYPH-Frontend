import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../shared/hooks";
import { useDeleteHotel } from "../../shared/hooks/useDeleteHotel"; 

export default function CardDetails({ hotel, onEdit, onDelete }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { role, user, isLoading } = useUser();
  const navigate = useNavigate();

  const { 
    removeHotel, 
    loading: loadingDelete, 
    error: errorDelete, 
    success: successDelete 
  } = useDeleteHotel();

  const hotelHostId =
    typeof hotel.host === "string"
      ? hotel.host
      : hotel.host?._id || hotel.host?.id;

  const puedeEditarOEliminar =
    role === "ADMIN_ROLE" ||
    (role === "HOST_ROLE" && hotelHostId && (user?._id === hotelHostId || user?.id === hotelHostId));

  const handleEditHotel = () => {
    if (onEdit) onEdit();
  };

  const handleDeleteHotel = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este hotel?")) return;
    const res = await removeHotel(hotel._id || hotel.id || hotel.hid);
    if (res.success) {
      if (onDelete) onDelete(); 
      else navigate("/dashboard");
    }
  };

  if (!hotel) return null;
  if (isLoading) return <div>Cargando usuario...</div>;

  const fallbackImages = [
    "https://i.ibb.co/CKXHZcB/burned1.jpg",
    "https://i.ibb.co/FxPSYFq/burned2.jpg",
    "https://i.ibb.co/ysVFF2X/burned3.jpg",
  ];

  const images =
    hotel.images && hotel.images.length > 0 ? hotel.images : fallbackImages;

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      className="card-details"
      sx={{
        maxWidth: 600,
        width: "90vw",
        minHeight: 640,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: "1rem",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          color: "#000",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: "#f5f5f5",
            zIndex: 100,
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000", mb: 2, textAlign: "center" }}
        >
          {hotel.name}
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 300,
            mb: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImage]}
                alt={`Imagen ${currentImage + 1} de hotel ${hotel.name}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                  userSelect: "none",
                  filter: "brightness(0.7) contrast(1.2) saturate(0.7)",
                }}
                draggable={false}
              />
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrev}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 4,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.8)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                      zIndex: 10,
                    }}
                    aria-label="Imagen anterior"
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 4,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.8)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                      zIndex: 10,
                    }}
                    aria-label="Imagen siguiente"
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </>
              )}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {images.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor:
                        idx === currentImage ? "primary.main" : "grey.400",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#eee",
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#000" }}>
                No hay imágenes disponibles
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#000" }}>
          Ubicación
        </Typography>
        <Typography paragraph sx={{ color: "#000" }}>
          {hotel.address || hotel.location || "No especificado"}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#000" }}>
          Descripción
        </Typography>
        <Typography paragraph sx={{ color: "#000" }}>
          {hotel.description || "Sin descripción disponible."}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#000" }}>
          Servicios
        </Typography>
        {hotel.services && hotel.services.length > 0 ? (
          <ul>
            {hotel.services.map((service, idx) => (
              <li key={idx}>
                <Typography sx={{ color: "#000" }}>
                  {`${service.type}: ${service.description} - Precio: Q${service.price}`}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography sx={{ color: "#000" }}>No hay servicios listados.</Typography>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold", color: "#000" }}>
          Precio por noche
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000" }}>
          Q{hotel.pricePerNight || "N/A"}
        </Typography>

        {puedeEditarOEliminar && (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="warning"
              sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2 }}
              onClick={handleEditHotel}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2 }}
              onClick={handleDeleteHotel}
              disabled={loadingDelete}
            >
              Eliminar
            </Button>
          </Box>
        )}

        {errorDelete && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {errorDelete}
          </Typography>
        )}
        {successDelete && (
          <Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
            {successDelete}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

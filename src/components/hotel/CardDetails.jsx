import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../shared/hooks/useUser";
import { useDeleteHotel } from "../../shared/hooks/useDeleteHotel";
import "../../pages/hotelPage/Hotel.css";

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
        (role === "HOST_ROLE" &&
            hotelHostId &&
            (user?._id === hotelHostId || user?.id === hotelHostId));

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
                marginTop: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "calc(100vh - 72px)",
            }}
        >
            <Box className="card-details-inner">
                <IconButton
                    onClick={() => navigate(-1)}
                    className="card-details-back-btn"
                >
                    <ArrowBackIosIcon sx={{ fontSize: 20 }} />
                </IconButton>

                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#000",
                        mb: 2,
                        textAlign: "center"
                    }}
                >
                    {hotel.name}
                </Typography>

                <Box className="card-details-img-box">
                    {images.length > 0 ? (
                        <>
                            <img
                                src={images[currentImage]}
                                alt={`Imagen ${currentImage + 1} de hotel ${hotel.name}`}
                                className="card-details-img"
                                draggable={false}
                            />
                            {images.length > 1 && (
                                <>
                                    <IconButton
                                        onClick={handlePrev}
                                        className="card-details-carousel-btn left"
                                        aria-label="Imagen anterior"
                                    >
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNext}
                                        className="card-details-carousel-btn right"
                                        aria-label="Imagen siguiente"
                                    >
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </>
                            )}
                            <Box className="card-details-carousel-dots">
                                {images.map((_, idx) => (
                                    <Box
                                        key={idx}
                                        onClick={() => setCurrentImage(idx)}
                                        className={`card-details-carousel-dot${idx === currentImage ? " active" : ""}`}
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

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={() => navigate(`/hoteles/${hotel._id || hotel.id || hotel.hid}/habitaciones`)}
                >
                    Ver habitaciones
                </Button>

                {/* Mueve los botones de editar/eliminar/historial aquí, al final */}
                <Box sx={{ flexGrow: 1 }} /> {/* Empuja los botones hacia abajo */}
                {puedeEditarOEliminar && (
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 8 }}>
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
                        <Button
                            variant="contained"
                            color="info"
                            sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2 }}
                            onClick={() => navigate(`/reservaciones/hotel/${hotel.hid}`)}
                            disabled={loadingDelete}
                        >
                            Ver historial de reservaciones
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

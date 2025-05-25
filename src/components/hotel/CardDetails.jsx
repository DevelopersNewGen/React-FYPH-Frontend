import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useUser } from "../../shared/hooks/useUser";
import { useDeleteHotel } from "../../shared/hooks/useDeleteHotel";
import { useHotelComment } from "../../shared/hooks/useHotelComment";
import { getHotelById } from "../../services/api";
import { findUserById } from "../../services/api";
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

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const {
    commentHotel,
    loading: loadingComment,
    error: errorComment,
    success: successComment,
    setError: setErrorComment,
    setSuccess: setSuccessComment
  } = useHotelComment();

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = async () => {
  setLoadingComments(true);
  try {
    const res = await getHotelById(hotel._id || hotel.id || hotel.hid);
    const hotelData = res.hotel || res;
    let ratings = hotelData.ratings || [];

    const ratingsWithUser = await Promise.all(
      ratings.map(async (c) => {
        let userName = "Usuario";
        try {
          if (c.user) {
            const userRes = await findUserById(c.user);
            userName = userRes?.user?.name || userRes?.name || userRes?.user?.email || "Usuario";
          }
        } catch {}
        return { ...c, userName };
      })
    );
    setComments(ratingsWithUser);
  } catch (err) {
    setComments([]);
    console.error("Error al obtener comentarios:", err);
  } finally {
    setLoadingComments(false);
  }
};

  useEffect(() => {
    if (hotel) fetchComments();
  }, [hotel]);

  useEffect(() => {
    if (successComment) fetchComments();
  }, [successComment]);

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

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setErrorComment("");
    setSuccessComment("");
    if (!rating) {
      setErrorComment("La calificación es obligatoria");
      return;
    }

    let userId = user?._id || user?.id;
    if (!userId) {
      setErrorComment("No se encontró el usuario. Inicia sesión nuevamente.");
      return;
    }
    if (typeof userId === "object" && userId.$oid) userId = userId.$oid;

    try {
      const res = await commentHotel(
        hotel._id || hotel.id || hotel.hid,
        { rating, comment, user: userId }
      );
      if (res.success) {
        setComment("");
        setRating(0);
        setShowCommentForm(false);
      } else if (res.error) {
        setErrorComment(res.error);
      }
    } catch (err) {
      setErrorComment("Error inesperado al enviar el comentario.");
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

        {user && (
          <>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setShowCommentForm((prev) => !prev)}
            >
              {showCommentForm ? "Cerrar comentario" : "Agregar comentario/calificación"}
            </Button>

            {showCommentForm && (
              <Box
                component="form"
                onSubmit={handleSubmitComment}
                sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2, maxWidth: 400 }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>Califica este hotel</Typography>
                <Rating
                  name="hotel-rating"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  precision={1}
                />
                <TextField
                  label="Comentario"
                  multiline
                  minRows={2}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  fullWidth
                  sx={{ my: 2 }}
                />
                {errorComment && <Typography color="error">{errorComment}</Typography>}
                {successComment && <Typography color="success.main">{successComment}</Typography>}
                <Button type="submit" variant="contained" disabled={loadingComment}>
                  {loadingComment ? "Enviando..." : "Enviar"}
                </Button>
              </Box>
            )}
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => navigate(`/hoteles/${hotel._id || hotel.id || hotel.hid}/habitaciones`)}
        >
          Ver habitaciones
        </Button>

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

        <Box sx={{ mt: 5 }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
    Comentarios
  </Typography>
  {loadingComments ? (
    <Typography sx={{ color: "#888" }}>Cargando comentarios...</Typography>
  ) : comments.length === 0 ? (
    <Typography sx={{ color: "#888" }}>No hay comentarios aún.</Typography>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: 300, 
        overflowY: "auto",
        pr: 1 
      }}
    >
      {comments.map((c, idx) => (
        <Box key={idx} sx={{ border: "1px solid #eee", borderRadius: 2, p: 2, mb: 1, background: "#fafafa" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography sx={{ fontWeight: "bold", color: "#1976d2" }}>
              {c.userName}
            </Typography>
            <Rating value={c.rating || c.ratings || c.value || 0} readOnly size="small" sx={{ ml: 1 }} />
            <Typography sx={{ color: "#888", fontSize: 13, ml: 2 }}>
              {c.createdAt || c.date ? new Date(c.createdAt || c.date).toLocaleString() : ""}
            </Typography>
          </Box>
          <Typography sx={{ color: "#222" }}>{c.comment || c.comentario || ""}</Typography>
        </Box>
      ))}
    </Box>
  )}
</Box>
      </Box>
    </Box>
  );
}
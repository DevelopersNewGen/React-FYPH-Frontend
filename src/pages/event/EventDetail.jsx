import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvents } from "../../services/api.jsx";
import ResponsiveAppBar from "../../components/Navbar.jsx";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./eventDetail.css";

import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const IMAGEN_EVENTO_DEFAULT =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

const IMAGENES_DEMO = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
];

export default function EventDetail() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(IMAGEN_EVENTO_DEFAULT);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const data = await getEvents();
        const found = (data.events || []).find((e) => String(e.eid) === eid);
        setEvento(found);
        const img = found?.imagenes?.[0] || IMAGEN_EVENTO_DEFAULT;
        setMainImage(img);
      } catch {
        setEvento(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvento();
  }, [eid]);

  const getPreviewImages = () => {
    if (evento?.imagenes && evento.imagenes.length > 1) {
      return evento.imagenes.slice(1, 4);
    }
    return IMAGENES_DEMO.slice(0, 3);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="event-page-wrapper">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : evento ? (
          <div className="event-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
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
                <p><DescriptionIcon fontSize="small" /> <b>Descripción:</b> {evento.description}</p>
                <p><CalendarMonthIcon fontSize="small" /> <b>Fecha:</b> {evento.date ? new Date(evento.date).toLocaleDateString() : "-"}</p>
                <p><AccessTimeIcon fontSize="small" /> <b>Hora:</b> {evento.time}</p>
                <p><CategoryIcon fontSize="small" /> <b>Categoría:</b> {evento.category}</p>
                <p><AttachMoneyIcon fontSize="small" /> <b>Costo:</b> {evento.cost ? `$${evento.cost}` : "Gratis"}</p>
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
        ) : (
          <p style={{ color: "red" }}>Evento no encontrado.</p>
        )}
      </div>
    </>
  );
}


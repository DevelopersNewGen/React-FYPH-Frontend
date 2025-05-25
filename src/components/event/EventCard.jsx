import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventIcon from "@mui/icons-material/Event";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEventCarousel } from "../../shared/hooks";
import { useNavigate } from "react-router-dom";

const IMAGEN_EVENTO_DEFAULT =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

const IMAGENES_DEMO = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
];

export function EventCard({ eid, name, category, images, date, time, location, cost }) {
  const imagenes = Array.isArray(images) && images.length > 0 ? images : IMAGENES_DEMO;
  const { current, handlePrev, handleNext } = useEventCarousel(imagenes);
  const navigate = useNavigate();

  const mostrarImagen =
    imagenes.length > 0 ? imagenes[current] : IMAGEN_EVENTO_DEFAULT;


  const fechaFormateada = date
    ? new Date(date).toLocaleDateString()
    : "-";

  return (
    <Card
      className="event-card"
      sx={{
        maxWidth: 350,
        minWidth: 350,
        width: 350,
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={mostrarImagen}
          alt={name}
        />
        {imagenes.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                color: "white",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                color: "white",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CategoryIcon fontSize="small" sx={{ mr: 0.5 }} />
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
          {fechaFormateada}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5 }} />
          {cost ? `$${cost}` : "Gratis"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/eventos/${eid}`)}>
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
}
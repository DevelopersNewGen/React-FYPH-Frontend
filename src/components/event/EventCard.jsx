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
import { useEventCarousel } from "../../shared/hooks/useEventCarousel.jsx";
import { useNavigate } from "react-router-dom";

const IMAGEN_EVENTO_DEFAULT =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

const IMAGENES_DEMO = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
];

export function EventCard({ eid, name, category, imagenes = IMAGENES_DEMO }) {
  const { current, handlePrev, handleNext } = useEventCarousel(imagenes);
  const navigate = useNavigate();

  const mostrarImagen =
    imagenes.length > 0 ? imagenes[current] : IMAGEN_EVENTO_DEFAULT;

  return (
    <Card sx={{ maxWidth: "500px", width: "100%", marginBottom: 2 }}>
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
        <Typography variant="body2" color="text.secondary">
          Categoría: {category}
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

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'; // <-- Importa useNavigate

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
];

export default function RoomCard() {
  const [current, setCurrent] = React.useState(0);
  const navigate = useNavigate(); // <-- Hook para navegar

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDetails = () => {
    navigate('/habitaciones/detalles'); // <-- Redirige a RoomDetails
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ position: 'relative' }}>
        <img
          src={images[current]}
          alt={`Habitación moderna ${current + 1}`}
          height="180"
          width="100%"
          style={{ objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
        />
        <IconButton onClick={handlePrev}>
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Habitación Deluxe
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          ⭐ 4.8 · 320 reseñas
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Espaciosa habitación con cama king, aire acondicionado, WiFi gratis, baño privado y desayuno incluido. Ideal para descansar y disfrutar de tu estadía.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDetails}>Ver detalles</Button>
      </CardActions>
    </Card>
  );
}
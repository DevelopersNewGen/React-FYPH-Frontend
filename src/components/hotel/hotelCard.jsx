import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';

export default function HotelCard({ hotel }) {
  const [current, setCurrent] = React.useState(0);
  const navigate = useNavigate();

  const images = hotel?.images?.length > 0 ? hotel.images : [
    "https://via.placeholder.com/345x180?text=Sin+imagen"
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDetails = () => {
    navigate(`/hotels/detalles/${hotel.id || hotel._id || hotel.hid}`);
  };

  if (!hotel || Object.keys(hotel).length === 0) {
    return null;
  }

  return (
    <Card 
      sx={{ maxWidth: 345, cursor: 'pointer', transition: 'transform 0.3s ease', ':hover': { transform: 'scale(1.03)', boxShadow: 6 } }}
      onClick={handleDetails}
      elevation={3}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={images[current]}
          alt={`Hotel ${hotel.name || "Sin nombre"} imagen ${current + 1}`}
          height="180"
          width="100%"
          style={{ objectFit: "cover", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
        />
        {images.length > 1 && (
          <>
            <IconButton onClick={e => { e.stopPropagation(); handlePrev() }} sx={{ position: "absolute", top: "40%", left: 0, backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={e => { e.stopPropagation(); handleNext() }} sx={{ position: "absolute", top: "40%", right: 0, backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap title={hotel.name}>
          {hotel.name || "Sin nombre"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }} noWrap title={hotel.location}>
          {hotel.location || "Sin ubicación"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap title={hotel.description}>
          {hotel.description || "Sin descripción"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary", mt: 1, fontWeight: '600' }}>
          Desde Q{hotel.pricePerNight ?? "?"} / noche
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={e => { e.stopPropagation(); handleDetails() }}>Ver detalles</Button>
      </CardActions>
    </Card>
  )
}

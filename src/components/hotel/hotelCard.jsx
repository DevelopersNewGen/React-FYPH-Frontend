import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function HotelCard({ hotel }) {
  const [current, setCurrent] = React.useState(0);
  const navigate = useNavigate();
  const intervalRef = React.useRef(null);

  const images = hotel?.images?.length > 0 ? hotel.images : [
    "https://via.placeholder.com/345x180?text=Sin+imagen"
  ];

  const startCarousel = () => {
    if (intervalRef.current || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
  };

  const stopCarousel = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleDetails = () => {
    navigate(`/hotels/detalles/${hotel.id || hotel._id || hotel.hid}`);
  };

  if (!hotel || Object.keys(hotel).length === 0) return null;

  return (
    <Card 
      className="card-wrapper"
      onClick={handleDetails}
      onMouseEnter={startCarousel}
      onMouseLeave={stopCarousel}
      elevation={3}
    >
      <Box className="card-image-container">
        <img
          src={images[current]}
          alt={`Hotel ${hotel.name || "Sin nombre"} imagen ${current + 1}`}
          className="card-image"
          draggable={false}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="card-title" title={hotel.name}>
          {hotel.name || "Sin nombre"}
        </Typography>
        <Typography variant="body2" className="card-text" title={hotel.location}>
          {hotel.location || "Sin ubicación"}
        </Typography>
        <Typography variant="body2" className="card-text" title={hotel.description}>
          {hotel.description || "Sin descripción"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  className="section-button"  size="small" onClick={(e) => { e.stopPropagation(); handleDetails(); }}>Ver detalles</Button>
      </CardActions>
    </Card>
  );
}

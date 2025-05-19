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
    'https://via.placeholder.com/345x180?text=No+Image'
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDetails = () => {
    navigate(`/hoteles/detalles/${hotel.id || hotel._id}`);
  };

  if (!hotel || Object.keys(hotel).length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{ position: 'relative' }}>
          <img
            src={images[current]}
            alt={`Hotel ${hotel.name} imagen ${current + 1}`}
            height="180"
            width="100%"
            style={{ objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
          {images.length > 1 && (
            <>
              <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '40%', left: 0 }}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '40%', right: 0 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {hotel.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {hotel.location}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {hotel.description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            <strong>Desde Q{hotel.pricePerNight} / noche</strong>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDetails}>Ver detalles</Button>
        </CardActions>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  Stack
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RoomIcon from '@mui/icons-material/Room';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function RoomCard({ room, role }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  if (!room || !room.numRoom) return null;

  const images = room?.images?.length > 0 ? room.images : [
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDetails = () => {
    navigate(`/habitaciones/detalles/${room.rid || room._id}`);
  };

  return (
    <Card className="room-card-fixed">
      <Box className="room-card-img-wrapper" sx={{ position: 'relative' }}>
        <img
          src={images[current]}
          alt={`Habitación imagen ${current + 1}`}
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
      <CardContent sx={{ padding: '8px 16px' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoomIcon color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight="bold">
            {room.numRoom}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <AttachMoneyIcon fontSize="small" sx={{ color: 'green' }} />
          <Typography variant="body2" sx={{ color: 'green' }}>
            Q{room.pricePerDay} / noche
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          {room.status ? (
            <CheckCircleIcon sx={{ color: 'green' }} fontSize="small" />
          ) : (
            <CancelIcon sx={{ color: 'red' }} fontSize="small" />
          )}
          <Typography
            variant="body2"
            sx={{
              color: room.status ? 'green' : 'red',
              fontWeight: 'medium'
            }}
          >
            {room.status ? 'Disponible' : 'No disponible'}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDetails}>
         DETALLES
        </Button>
      </CardActions>
    </Card>
  );
}

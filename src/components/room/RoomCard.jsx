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
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRooms } from '../../shared/hooks';
import RoomEdit from './RoomEdit';

export default function RoomCard({ room, showAddButton, role }) {
  const [current, setCurrent] = useState(0);
  const [showEdit, setShowEdit] = useState(false); 
  const navigate = useNavigate();
  const { fetchRooms } = useRooms();

  const images = room?.images?.length > 0 ? room.images : [];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDetails = () => {
    navigate(`/habitaciones/detalles/${room.rid || room._id}`);
  };

  const handleAddRoom = () => {
    navigate('/habitaciones/agregar');
  };

  const handleEditRoom = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    fetchRooms(); 
  };

  if (
    showAddButton &&
    (role === 'ADMIN_ROLE' || role === 'HOST_ROLE') &&
    (!room || Object.keys(room).length === 0)
  ) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
        <Button
          onClick={handleAddRoom}
          color="primary"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Agregar Habitación
        </Button>
      </div>
    );
  }

  if (!room || Object.keys(room).length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
      <Card className="room-card-fixed">
        <Box className="room-card-img-wrapper" sx={{ position: 'relative' }}>
          <img
            src={images[current]}
            alt={`Habitación ${room.name} imagen ${current + 1}`}
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
            {room.numRoom}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {room.type} · Capacidad: {room.capacity}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {room.description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            <strong>Q{room.pricePerDay} / noche</strong>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDetails}>
            Ver detalles
          </Button>
          {(role === 'ADMIN_ROLE' || role === 'HOST_ROLE') && (
            <Button size="small" color="secondary" onClick={handleEditRoom}>
              Editar
            </Button>
          )}
        </CardActions>
      </Card>
      {showEdit && <RoomEdit roomData={room} onClose={handleCloseEdit} />}
    </div>
  );
}
import React from 'react';
import { Button } from '@mui/material';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/hooks';

const RoomAddButton = () => {
  const { role } = useUser();
  const navigate = useNavigate();

  const isAllowed = role === 'ADMIN_ROLE' || role === 'HOST_ROLE';

  if (!isAllowed) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddHomeWorkIcon />}
      onClick={() => navigate('/habitaciones/agregar')}
      sx={{ mt: 2 }}
    >
      Agregar Habitación
    </Button>
  );
};

export default RoomAddButton;

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createRoom } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useRoomAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddRoom = async (formData) => {
    setIsLoading(true);
    const res = await createRoom(formData);

    if (res.error) {
      toast.error(res.e?.response?.data?.message || 'Error al crear la habitación');
      setIsLoading(false);
      return false;
    }

    toast.success('Habitación creada correctamente');
    setIsLoading(false);
    navigate('/habitaciones');
    return true;
  };

  return {
    handleAddRoom,
    isLoading,
  };
};
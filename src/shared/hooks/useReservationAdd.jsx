import { useState } from 'react';
import toast from 'react-hot-toast';
import { createReservation } from '../../services/api';

export const useReservationAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationId, setReservationId] = useState(null);

  const handleAddReservation = async (rid, formData) => {
    setIsLoading(true);
    setIsSuccess(false);
    setReservationId(null);

    try {
      console.log('Creando reservación para habitación:', rid);
      const response = await createReservation(rid, formData);
      console.log('Respuesta de la API:', response);
      
      if (response?.error) {
        throw new Error(response.e?.response?.data?.message || 'Error al crear la reservación');
      }

      // Extracción del ID de la reservación (4 métodos compatibles)
      const newReservationId = response?.id || 
                             response?.data?.id || 
                             response?.reservation?.id ||
                             response?.reservation?._id;

      if (!newReservationId) {
        throw new Error('No se recibió el ID de reservación en la respuesta');
      }

      console.log('Reservación creada con ID:', newReservationId);
      setReservationId(newReservationId);
      setIsSuccess(true);
      return newReservationId;

    } catch (error) {
      console.error('Error al crear reservación:', error);
      toast.error(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAddReservation,
    isLoading,
    isSuccess,
    reservationId
  };
};
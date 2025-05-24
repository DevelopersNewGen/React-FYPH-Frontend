import { useState } from 'react';
import { updateHotel } from '../../services/api';

export const useHotelEdit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const editHotel = async (hid, formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await updateHotel(hid, formData); 
      if (res.success) {
        setSuccess('Hotel actualizado correctamente');
        return { success: true, data: res };
      } else {
        setError(res.msg || 'Error al actualizar el hotel');
        return { success: false, error: res.msg || 'Error al actualizar el hotel' };
      }
    } catch (err) {
      const msg = err?.response?.data?.msg || 'Error al actualizar el hotel';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    editHotel,
    loading,
    error,
    success,
    setError,
    setSuccess
  };
};

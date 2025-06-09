import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchReservationBillBlob } from '../../services/api';

export const useReservationBill = (reservationId) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBill = useCallback(async () => {
    if (!reservationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const blob = await fetchReservationBillBlob(reservationId);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar la factura');
      toast.error('Error al cargar la factura');
    } finally {
      setIsLoading(false);
    }
  }, [reservationId]);

  useEffect(() => {
    loadBill();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [loadBill]);

  return {
    pdfUrl,
    isLoading,
    error,
    reload: loadBill,
  };
};
import { useState, useEffect } from 'react';
import { getReservationsByHost } from '../../services/api';

export const useReservationsByHost = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getReservationsByHost();
        if (response.error) {
          throw response.e;
        }
        if (mounted) {
          setReservations(response.data.reservations || []);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return { reservations, isLoading, error };
};
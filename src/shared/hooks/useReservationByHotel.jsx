import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { listHotelsWithReservationCount } from '../../services/api';

export const useReservationByHotel = (limit = 10) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      const res = await listHotelsWithReservationCount(limit);
      if (res.error) {
        const msg = res.e?.response?.data?.message
          || 'Error al obtener la lista de hoteles';
        toast.error(msg);
        setLoading(false);
        return;
      }
      const hotels = res.data.hotels || [];
      setLabels(hotels.map(h => h.hotel));
      setValues(hotels.map(h => h.numReservaciones));
      setLoading(false);
    };

    fetchHotels();
  }, [limit]);

  return { labels, values, loading };
};
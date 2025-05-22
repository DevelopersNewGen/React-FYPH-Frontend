import { useState, useEffect } from 'react';
import { getHotels } from '../../services/api';

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await getHotels();
      if (response?.data?.hotels) {
        setHotels(response.data.hotels);
      }
      setLoadingHotels(false);
    };
    fetchHotels();
  }, []);

  return { hotels, loadingHotels };
};
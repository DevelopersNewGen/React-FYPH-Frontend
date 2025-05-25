import { useEffect, useState } from "react";
import { getHotels } from "../../services/api";

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoadingHotels(true);
      const res = await getHotels();
      if (res.hotels) {
        setHotels(res.hotels);
      } else {
        setHotels([]);
      }
      setLoadingHotels(false);
    };
    fetchHotels();
  }, []);

  return { hotels, loadingHotels };
};
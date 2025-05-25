import { useState, useCallback } from "react";
import { getTopHotels, getHotelReservations } from "../../services/api";
 
export const useReport = () => {
  const [topHotels, setTopHotels] = useState([]);
  const [hotelReservations, setHotelReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchTopHotels = useCallback(async (limit = 5) => {
    setLoading(true);
    setError(null);
    const res = await getTopHotels(limit);
    if (res.success) {
      setTopHotels(res.hotels);
    } else {
      setError(res.error);
    }
    setLoading(false);
  }, []);
 
  const fetchHotelReservations = useCallback(async (hid) => {
    setLoading(true);
    setError(null);
    const res = await getHotelReservations(hid);
    if (res.success) {
      setHotelReservations(res.reservations || []);
    } else {
      setHotelReservations([]);
      setError(res.error);
    }
    setLoading(false);
  }, []);
 
  return {
    topHotels,
    hotelReservations,
    loading,
    error,
    fetchTopHotels,
    fetchHotelReservations,
  };
};
 
export default useReport;
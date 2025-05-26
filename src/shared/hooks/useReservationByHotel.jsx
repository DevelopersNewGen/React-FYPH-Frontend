import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getReservationByHotel } from '../../services'

export const useReservationByHotel = (hid) =>{
    const [reservations, setReservations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchReservations = useCallback(async () => {
        if (!hid) return;
        setIsFetching(true);
        const res = await getReservationByHotel(hid);
        if (res.error) {
        toast.error(res.e?.response?.data?.message || 'Error al cargar reservaciones');
        } else {
        setReservations(res.data.reservations);
        }

        setIsFetching(false);
    }, [hid]);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return {
        reservations,     
        isFetching,       
        refresh: fetchReservations 
    };
}

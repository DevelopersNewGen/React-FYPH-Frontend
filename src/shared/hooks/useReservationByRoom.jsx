import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getReservationsByRoom } from '../../services/api';

export const useReservationsByRoom = (rid) => {
    const [reservations, setReservations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchReservations = useCallback(async () => {
        if (!rid) return;
        setIsFetching(true);
        const res = await getReservationsByRoom(rid);
        if (res.error) {
        toast.error(res.e?.response?.data?.message || 'Error al cargar reservaciones');
        } else {
        setReservations(res.data.reservations);
        }

        setIsFetching(false);
    }, [rid]);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return {
        reservations,     
        isFetching,       
        refresh: fetchReservations 
    };
};
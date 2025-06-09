import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getReservationByUser } from '../../services/api';

export const useReservationByUser = () => {
    const [reservations, setReservations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchReservations = useCallback(async () => {
        setIsFetching(true);
        const res = await getReservationByUser();

        if (res.error) {
            toast.error(res.e?.response?.data?.message || 'Error al cargar reservaciones');
        } else {
            setReservations(res.data.reservations || []);
        }

        setIsFetching(false);
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return {
        reservations,
        isFetching,
        refresh: fetchReservations,
    };
};

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getRooms as getRoomsRequest } from '../../services/api';

export const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getRooms = useCallback(async () => {
        setIsFetching(true);
        const roomsData = await getRoomsRequest();

        if (roomsData.error) {
            toast.error(roomsData.e?.response?.data?.message || 'Error al obtener las habitaciones');
            setIsFetching(false);
            return;
        }

        setRooms(roomsData.data.rooms);
        setIsFetching(false);
    }, []);

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    return {
        getRooms,
        allRooms: rooms,
        isFetching
    };
};
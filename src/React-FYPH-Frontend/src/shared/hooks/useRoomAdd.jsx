import { useState } from 'react';
import toast from 'react-hot-toast';
import { createRoom } from '../../services/api';

export const useRoomAdd = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addRoom = async (formData) => {
        setIsSubmitting(true);
        const response = await createRoom(formData);

        if (response.error) {
            toast.error(response.e?.response?.data?.message || 'Error al agregar la habitación');
            setIsSubmitting(false);
            return;
        }

        toast.success('Habitación agregada exitosamente');
        setIsSubmitting(false);
        return response.data;
    };

    return {
        addRoom,
        isSubmitting,
    };
};
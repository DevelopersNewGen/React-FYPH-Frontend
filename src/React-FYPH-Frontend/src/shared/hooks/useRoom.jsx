// filepath: c:\Users\omarx\OneDrive\Escritorio\Nueva carpeta (3)\React-FYPH-Frontend\src\shared\hooks\useRoom.jsx
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createRoom } from '../../services/api';

export const useRoomAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        capacity: '',
        description: '',
        pricePerDay: '',
        images: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(e.target.files)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData.images.forEach(image => {
                    formDataToSend.append('images', image);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        const response = await createRoom(formDataToSend);
        setIsSubmitting(false);

        if (response.error) {
            toast.error(response.e?.response?.data?.message || 'Error al crear la habitación');
        } else {
            toast.success('Habitación creada con éxito');
            setFormData({
                name: '',
                type: '',
                capacity: '',
                description: '',
                pricePerDay: '',
                images: []
            });
        }
    };

    return {
        formData,
        handleChange,
        handleFileChange,
        handleSubmit,
        isSubmitting
    };
};
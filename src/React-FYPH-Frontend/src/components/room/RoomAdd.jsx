import React, { useState } from 'react';
import { useRoomAdd } from '../../shared/hooks/useRoomAdd';
import { TextField, Button, Typography } from '@mui/material';

const RoomAdd = () => {
    const { addRoom, isLoading, error } = useRoomAdd();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        capacity: '',
        description: '',
        pricePerDay: '',
        images: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addRoom(formData);
    };

    return (
        <div>
            <Typography variant="h4">Agregar Nueva Habitación</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="type"
                    label="Tipo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="capacity"
                    label="Capacidad"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="description"
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="pricePerDay"
                    label="Precio por Noche"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="images"
                    onChange={handleChange}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                >
                    {isLoading ? 'Cargando...' : 'Agregar Habitación'}
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </form>
        </div>
    );
};

export default RoomAdd;
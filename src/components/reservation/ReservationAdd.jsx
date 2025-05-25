import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReservationAdd } from '../../shared/hooks/useReservationAdd';
import { useReservationsByRoom } from '../../shared/hooks/useReservationByRoom';
import { Box, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { LocalizationProvider, DatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isWithinInterval from 'date-fns/isWithinInterval';

export default function ReservationAdd() {
    const { rid } = useParams();
    const { handleAddReservation, isLoading, isSuccess } = useReservationAdd();
    const { reservations, isFetching } = useReservationsByRoom(rid);

    const [form, setForm] = useState({ startDate: null, exitDate: null });

    const reservedIntervals = reservations.map(r => ({
        start: new Date(r.startDate.split('T')[0]),
        end:   new Date(r.exitDate.split('T')[0])
    }));

    const handleChange = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddReservation(rid, form);
    };

    const renderDay = (day, _value, DayComponentProps) => {
        const isBlocked = reservedIntervals.some(interval =>
        isWithinInterval(day, interval)
        );
        return (
        <PickersDay
            {...DayComponentProps}
            disabled={isBlocked}
            sx={
            isBlocked
                ? { backgroundColor: 'error.main', color: 'common.white', '&:hover': { backgroundColor: 'error.dark' } }
                : {}
            }
        />
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* Contenedor principal que centra vertical y horizontalmente */}
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Ocupa al menos el 100% del viewport height
            width: '100%',
            bgcolor: 'background.default',
            p: 2
            }}
        >
            {/* Contenedor del formulario con ancho fijo */}
            <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                width: '100%',
                maxWidth: 400,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
            >
            <Typography variant="h5" fontWeight={600} align="center" mb={2}>
                Agregar Reservación
            </Typography>

            {!isSuccess ? (
                <>
                <DatePicker
                    label="Fecha de entrada"
                    value={form.startDate}
                    onChange={newValue => handleChange('startDate', newValue)}
                    renderDay={renderDay}
                    disablePast
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                />

                <DatePicker
                    label="Fecha de salida"
                    value={form.exitDate}
                    onChange={newValue => handleChange('exitDate', newValue)}
                    renderDay={renderDay}
                    disablePast
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading || isFetching}
                    sx={{ mt: 2 }}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Agregar Reservación'}
                </Button>
                </>
            ) : (
                <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                <Typography variant="h6" color="success.main">✔️</Typography>
                <Typography variant="body1" color="success.main">
                    Reservación creada correctamente
                </Typography>
                </Stack>
            )}
            </Box>
        </Box>
        </LocalizationProvider>
    );
}
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReservationAdd } from '../../shared/hooks/useReservationAdd';
import { useReservationsByRoom } from '../../shared/hooks/useReservationByRoom';
import { useReservationBill } from '../../shared/hooks/useReservationBill';
import { Box, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isWithinInterval from 'date-fns/isWithinInterval';

export default function ReservationAdd() {
    const { rid } = useParams();
    const navigate = useNavigate();
    const { handleAddReservation, isLoading, isSuccess, reservationId } = useReservationAdd();
    const { reservations, isFetching } = useReservationsByRoom(rid);
    const { pdfUrl, isLoading: isBillLoading, error: billError } = useReservationBill(reservationId);

    const [form, setForm] = useState({ startDate: null, exitDate: null });

    const reservedIntervals = reservations.map(r => ({
        start: new Date(r.startDate.split('T')[0]),
        end: new Date(r.exitDate.split('T')[0])
    }));

    const handleChange = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddReservation(rid, form);
    };

    const handleBackToDashBoard = () => {
        navigate('/');
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
                    isBlocked ? {
                        backgroundColor: 'error.main',
                        color: 'common.white',
                        '&:hover': { backgroundColor: 'error.dark' }
                    } : {}
                }
            />
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: 'auto',
                minHeight: '100vh',
                bgcolor: 'transparent',
                p: 2,
                marginTop: '80px',
            }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                    width: '100%',
                    maxWidth: 900,
                    p: 4,
                    bgcolor: '#ffffff',
                    borderRadius: 3,
                    boxShadow: '0px 6px 15px rgba(25, 118, 210, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    border: '2px solid #1976d2',
                    '@media (max-width: 600px)': {
                        maxWidth: '95%',
                        padding: 3,
                    }
                }}>
                    <Typography variant="h5" fontWeight={600} align="center" sx={{ color: '#1976d2', mb: 2 }}>
                        📅 Agregar Reservación
                    </Typography>

                    {!isSuccess ? (
                        <>
                            <DatePicker
                                label="Fecha de entrada"
                                value={form.startDate}
                                onChange={newValue => handleChange('startDate', newValue)}
                                renderDay={renderDay}
                                disablePast
                                slotProps={{ textField: { fullWidth: true, required: true, variant: 'outlined' } }}
                            />

                            <DatePicker
                                label="Fecha de salida"
                                value={form.exitDate}
                                onChange={newValue => handleChange('exitDate', newValue)}
                                renderDay={renderDay}
                                disablePast
                                minDate={form.startDate}
                                slotProps={{ textField: { fullWidth: true, required: true, variant: 'outlined' } }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: '#1976d2',
                                    color: 'white',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&:hover': { bgcolor: '#1565c0' },
                                }}
                                disabled={isLoading || isFetching}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Agregar Reservación'}
                            </Button>
                        </>
                    ) : (
                        <Stack spacing={2} sx={{ pt: 2, width: '100%' }}>
                            <Alert severity="success" sx={{ mb: 2, bgcolor: '#bbdefb', color: '#0d47a1' }}>
                                ¡Reservación y factura generadas con éxito!
                            </Alert>

                            {/* PDF con margen superior para bajar */}
                            {pdfUrl && (
                                <Box sx={{
                                    border: '2px solid #1976d2',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    height: '400px',
                                    width: '100%',
                                    marginTop: '50px', // Baja el PDF
                                    paddingBottom: '20px', // Espacio debajo del PDF
                                }}>
                                    <iframe
                                        src={pdfUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none', display: 'block' }}
                                        title="Factura de reservación"
                                    />
                                </Box>
                            )}

                            {/* Botones ahora están debajo del PDF */}
                            <Stack spacing={2} sx={{ width: '100%', marginTop: '20px' }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleBackToDashBoard}
                                    sx={{ color: '#1976d2', borderColor: '#1976d2' }}
                                >
                                    ← Regresar a ver los hoteles
                                </Button>
                            </Stack>

                        </Stack>
                    )}
                </Box>
            </Box>
        </LocalizationProvider>
    );
}
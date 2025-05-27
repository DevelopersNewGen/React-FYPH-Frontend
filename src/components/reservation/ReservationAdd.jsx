import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Añadí useNavigate
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
                alignItems: 'flex-start',
                minHeight: '100vh', 
                width: '100%',
                bgcolor: 'background.default',
                pt: 12,
                p: 2
            }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                    width: '100%',
                    maxWidth: 800,
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 12
                }}>
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
                                minDate={form.startDate}
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
                        <Stack spacing={2} sx={{ pt: 2 }}>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                ¡Reservación y factura generadas con éxito!
                            </Alert>
                            
                            {isBillLoading ? (
                                <Box display="flex" justifyContent="center" py={2}>
                                    <CircularProgress />
                                    <Typography sx={{ ml: 2 }}>Generando factura...</Typography>
                                </Box>
                            ) : billError ? (
                                <Alert severity="error">
                                    Error al cargar la factura: {billError}
                                </Alert>
                            ) : (
                                pdfUrl && (
                                    <>
                                        <Box sx={{ 
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            height: '500px'
                                        }}>
                                            <iframe 
                                                src={pdfUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ 
                                                    border: 'none',
                                                    display: 'block'
                                                }}
                                                title="Factura de reservación"
                                            />
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            onClick={handleBackToDashBoard}
                                            sx={{ mt: 2 }}
                                        >
                                            ← Regresar a ver los hoteles
                                        </Button>
                                    </>
                                )
                            )}
                        </Stack>
                    )}
                </Box>
            </Box>
        </LocalizationProvider>
    );
}
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { de } from 'date-fns/locale';

export default function ReservationCard({ reservation }) {
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate(`/reservas/detalles/${reservation.id || reservation._id || reservation.rid}`);
    }

    if (!reservation || Object.keys(reservation).length === 0) {
        return null;
    }

    return (
        <Card 
            sx={{
                maxWidth: 400, // Más ancho para mejor visualización
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': { transform: 'scale(1.05)', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)' },
                bgcolor: '#ffffff',
                borderRadius: 3,
                boxShadow: '0px 4px 8px rgba(25, 118, 210, 0.2)',
                p: 2,
            }}
            onClick={handleDetails}
            elevation={4}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" sx={{ color: '#1976d2', fontWeight: 600 }}>
                    {reservation.user || "Sin nombre"}
                </Typography>
                <Typography gutterBottom variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                    Habitación {reservation.room.numRoom || "Sin nombre"} - {reservation.room.type}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Desde {new Date(reservation.startDate).toLocaleDateString(de)} hasta {new Date(reservation.exitDate).toLocaleDateString(de)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', paddingX: 2 }}>
                <Button
                    size="small"
                    onClick={(e) => { e.stopPropagation(); handleDetails(); }}
                    sx={{
                        bgcolor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#1565c0' },
                    }}
                >
                    Ver detalles
                </Button>
            </CardActions>
        </Card>
    );
};
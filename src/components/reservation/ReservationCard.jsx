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
            sx={{ maxWidth: 345, cursor: 'pointer', transition: 'transform 0.3s ease', ':hover': { transform: 'scale(1.03)', boxShadow: 6 } }}
            onClick={handleDetails}
            elevation={3}
        >
            <CardContent>
                <Tipography gutterBottom variant="h5" component="div"> 
                    {reservation.user || "Sin nombre"}
                </Tipography>
                <Typography gutterBottom variant="h5" component="div">
                    Cuatro {reservation.room.numRoom || "Sin nombre" } Tipo {reservation.room.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Desde {new Date(reservation.startDate).toLocaleDateString(de)} hasta {new Date(reservation.exitDate).toLocaleDateString(de)}
                </Typography>
            </CardContent>
            <CardActions>
                    <Button size="small" onClick={e => { e.stopPropagation(); handleDetails() }}>Ver detalles</Button>
            </CardActions>
        </Card>
    );
}
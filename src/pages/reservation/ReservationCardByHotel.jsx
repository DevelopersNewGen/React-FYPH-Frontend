import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { ResponsiveAppBar } from "../../components/Navbar";
import { useUser } from "../../shared/hooks";
import { useReservationByHotel } from "../../shared/hooks/useReservationByHotel"; 
import ReservationDetailsPage from "../../components/reservation/CardDetails";

export default function ReservationCardByHotel() {
    const { hid } = useParams();
    const { role } = useUser();
    const { reservations, isFetching } = useReservationByHotel(hid);

    return (
        <>
            <ResponsiveAppBar role={role} />
            <Box className="room-page-container" sx={{ paddingTop: { xs: 10, md: 12 } }}>
                <Typography variant="h3" className="room-header" gutterBottom>
                    Reservaciones del hotel
                </Typography>

                {isFetching ? (
                    <Typography>Cargando reservaciones...</Typography>
                ) : reservations?.length === 0 ? (
                    <Typography>No hay reservaciones para este hotel.</Typography>
                ) : (
                    <div className="room-list-grid">
                        {reservations.map((reser) => (
                            <ReservationDetailsPage key={reser.rid} reser={reser} />
                        ))}
                    </div>
                )}
            </Box>
        </>
    );
}
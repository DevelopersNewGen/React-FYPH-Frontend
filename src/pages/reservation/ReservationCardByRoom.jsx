import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { ResponsiveAppBar } from "../../components/Navbar";
import { useUser } from "../../shared/hooks";
import { useReservationsByRoom } from "../../shared/hooks/useReservationByRoom"; 
import ReservationDetailsPage from "../../components/reservation/CardDetails";

export default function ReservationCardByRoom() {
    const { rid } = useParams();
    const { role } = useUser();
    const { reservations, isFetching } = useReservationsByRoom(rid);

    return (
        <>
            <ResponsiveAppBar role={role} />
            <Box className="room-page-container" sx={{ paddingTop: { xs: 10, md: 12 } }}>
                <Typography variant="h3" className="room-header" gutterBottom>
                    Reservaciones de la habitacion
                </Typography>

                {isFetching ? (
                    <Typography>Cargando reservaciones...</Typography>
                ) : reservations?.length === 0 ? (
                    <Typography>No hay reservaciones para esta habitacion.</Typography>
                ) : (
                    <div className="room-list-grid">
                        {reservations.map((reser) => (
                            <ReservationDetailsPage key={reser._id || reser.rid} reser={reser} />
                        ))}
                    </div>
                )}
            </Box>
        </>
    );
}

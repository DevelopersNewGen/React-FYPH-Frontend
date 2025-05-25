import {
    Box,
    Typography,
    IconButton,
    Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../shared/hooks/useUser";
import { useReservationDelete } from "../../shared/hooks/useReservationDelete";

export default function ReservationDetailsPage({ reser, onDelete }) {
    const { role, isLoading } = useUser();
    const navigate = useNavigate();

    const {
        removeReservation,
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useReservationDelete();

    const puedeEliminar =
        role === "ADMIN_ROLE" ||
        role === "HOST_ROLE" ||
        role === "CLIENT_ROLE";

    const handleDeleteReservation = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reservación?")) return;

    const res = await removeReservation(
        reser._id || reser.id || reser.rid
    );

    if (res.success) {
        if (onDelete) onDelete();
        else navigate("/dashboard");
    }
    };

    if (isLoading) return <div>Cargando reservación...</div>;

    return (
    <Box
        className="card-details"
        sx={{
        maxWidth: 600,
        width: "90vw",
        minHeight: 640,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        }}
    >
        <Box
        sx={{
            maxWidth: 600,
            width: "100%",
            padding: "1rem",
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            color: "#000",
            position: "relative",
        }}
        >
        <IconButton
            onClick={() => navigate(-1)}
            sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: "#f5f5f5",
            zIndex: 100,
            "&:hover": { backgroundColor: "#e0e0e0" },
            }}
        >
            <ArrowBackIosIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
            fontWeight: "bold",
            color: "#000",
            mb: 2,
            textAlign: "center",
            }}
        >
            {reser.room?.type || "Reservación sin tipo de habitación"}
        </Typography>

        <Typography
            variant="h6"
            paragraph
            gutterBottom
            sx={{ fontWeight: "bold", color: "#000" }}
        >
            Usuario<br />
            Nombre: {reser.user?.name || "No especificado"}<br />
            Correo: {reser.user?.email || "No especificado"}
        </Typography>

        <Typography
            variant="h6"
            paragraph
            gutterBottom
            sx={{ fontWeight: "bold", color: "#000" }}
        >
            Cuarto<br />
            Número de Cuarto: {reser.room?.numRoom || "No especificado"}<br />
            Tipo: {reser.room?.type || "No especificado"}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#000" }}>
            Fecha de ingreso
        </Typography>
        <Typography paragraph sx={{ color: "#000" }}>
            {reser.startDate || "No especificado"}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#000" }}>
            Fecha de salida
        </Typography>
        <Typography paragraph sx={{ color: "#000" }}>
            {reser.exitDate || "No especificado"}
        </Typography>

        {puedeEliminar && (
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
                <Button
                variant="contained"
                color="error"
                sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2 }}
                onClick={handleDeleteReservation}
                disabled={loadingDelete}
                >
                Eliminar
                </Button>
            </Box>
        )}

        {errorDelete && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {errorDelete}
            </Typography>
            )}
            {successDelete && (
            <Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
                {successDelete}
            </Typography>
            )}
        </Box>
        </Box>
    );
}

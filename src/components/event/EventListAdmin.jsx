import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function EventListAdmin({ eventos }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filtrado simple por nombre, ubicación o categoría
  const eventosFiltrados = eventos.filter((evento) => {
    const searchLower = search.toLowerCase();
    return (
      evento.name.toLowerCase().includes(searchLower) ||
      evento.location.toLowerCase().includes(searchLower) ||
      evento.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        px: 2,
        maxHeight: 400,
        overflowY: "auto",
        backgroundColor: "#f0f4f8",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        marginTop: "500px", // Asegura que no se superponga con la barra de navegación
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#222",
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          letterSpacing: ".1rem",
        }}
      >
        Lista de Eventos Administrador
      </Typography>

      <TextField
        label="Buscar eventos..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {eventosFiltrados.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "#666", mt: 4 }}
        >
          No hay eventos para mostrar.
        </Typography>
      ) : (
        eventosFiltrados.map((evento) => (
          <Box
            key={evento.eid}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "1.5rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              px: 4,
              py: 3,
              mb: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              color: "#222",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#0077a6",
                color: "#fff",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                transform: "scale(1.02)",
              },
            }}
            onClick={() => navigate(`/eventos/${evento.eid}`)}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {evento.name}
              </Typography>
              <Typography sx={{ fontSize: 15 }}>📍 {evento.location}</Typography>
              <Typography sx={{ fontSize: 15 }}>
                📅 {new Date(evento.date).toLocaleDateString()} — 🕒 {evento.time}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                🎯 Categoría: <b>{evento.category}</b>
              </Typography>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: "2rem",
                fontWeight: 700,
                px: 3,
                py: 1,
                background: "#121212",
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              Ver detalles
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
}

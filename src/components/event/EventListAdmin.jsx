import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function EventListAdmin({ eventos }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 4 }}>
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          mb: 2,
          fontWeight: 700,
          letterSpacing: ".1rem",
        }}
      >
      </Typography>
      {eventos.map((evento) => (
        <Box
          key={evento.eid}
          sx={{
            background: "#0077a6",
            borderRadius: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
            mb: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "3px solid transparent",
            "&:hover": {
              border: "3px solid #7b2ff2",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
              {evento.name}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 16 }}>
              {evento.location}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14 }}>
              {new Date(evento.date).toLocaleDateString()} - {evento.time}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14 }}>
              Categoría: {evento.category}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "2rem",
                fontWeight: 700,
                px: 4,
                py: 1,
                background: "#111",
                color: "#fff",
                "&:hover": { background: "#222" },
              }}
              onClick={() => navigate(`/eventos/${evento.eid}`)}
            >
              MÁS DETALLES
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

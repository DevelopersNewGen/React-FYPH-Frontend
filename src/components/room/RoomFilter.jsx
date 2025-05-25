import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

const statusOptions = [
  { value: "", label: "Todos" },
  { value: "available", label: "Disponible" },
  { value: "occupied", label: "Ocupada" },
];

const capacityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function RoomFilter({ allRooms, onFilteredRoomsChange }) {
  const [filters, setFilters] = useState({
    status: "",
    capacity: "",
    price: [0, 1000],
  });

  useEffect(() => {
    if (!Array.isArray(allRooms)) return;

    const result = allRooms.filter((room) => {
      if (filters.status === "available" && room.status !== true) return false;
      if (filters.status === "occupied" && room.status !== false) return false;

      if (filters.capacity && String(room.capacity) !== String(filters.capacity)) return false;

      if (room.pricePerDay < filters.price[0] || room.pricePerDay > filters.price[1]) return false;

      return true;
    });

    onFilteredRoomsChange(result);
  }, [filters, allRooms]);

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", mb: 2 }}>
      {/* Status */}
      <FormControl size="small">
        <InputLabel>Estado</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) => handleChange("status", e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    
      <FormControl size="small">
        <InputLabel>Capacidad</InputLabel>
        <Select
          value={filters.capacity}
          label="Capacidad"
          onChange={(e) => handleChange("capacity", String(e.target.value))}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Todas</MenuItem>
          {capacityOptions.map((cap) => (
            <MenuItem key={cap} value={String(cap)}>
              {cap}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Precio */}
      <Box sx={{ width: 200 }}>
        <Typography variant="body2">Rango de precio</Typography>
        <Slider
          value={filters.price}
          onChange={(_, val) => handleChange("price", val)}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={10}
          sx={{ mx: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>Q{filters.price[0]}</span>
          <span>Q{filters.price[1]}</span>
        </Box>
      </Box>
    </Box>
  );
}

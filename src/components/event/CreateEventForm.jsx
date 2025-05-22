import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Paper, Typography, CircularProgress } from "@mui/material";
import { useCreateEvent } from "../../shared/hooks/useCreateEvent";
import {
  validateEventName,
  validateEventNameMessage,
  validateEventDescription,
  validateEventDescriptionMessage,
  validateEventLocation,
  validateEventLocationMessage,
  validateEventCost,
  validateEventCostMessage,
  validateEventTime,
  validateEventTimeMessage,
  validateEventDate,
  validateEventDateMessage,
  validateEventCategory,
  validateEventCategoryMessage,
} from "../../shared/validators";

const CATEGORIES = [
  { value: "weding", label: "Boda" },
  { value: "party", label: "Fiesta" },
  { value: "business", label: "Negocios" },
  { value: "other", label: "Otro" },
];

export default function CreateEventForm() {
  const { createEvent, isLoading } = useCreateEvent();
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "other",
    cost: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!validateEventName(form.name)) errs.name = validateEventNameMessage;
    if (!validateEventDescription(form.description)) errs.description = validateEventDescriptionMessage;
    if (!validateEventDate(form.date)) errs.date = validateEventDateMessage;
    if (!validateEventTime(form.time)) errs.time = validateEventTimeMessage;
    if (!validateEventLocation(form.location)) errs.location = validateEventLocationMessage;
    if (!validateEventCategory(form.category)) errs.category = validateEventCategoryMessage;
    if (!validateEventCost(form.cost)) errs.cost = validateEventCostMessage;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const eventData = {
      ...form,
      cost: form.cost === "" ? 0 : Number(form.cost),
    };
    createEvent(eventData);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" mb={2} align="center">
          Crear Evento
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            fullWidth
            required
            margin="normal"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Descripción"
            name="description"
            fullWidth
            required
            margin="normal"
            multiline
            minRows={2}
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Fecha"
            name="date"
            type="date"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
            error={!!errors.date}
            helperText={errors.date}
          />
          <TextField
            label="Hora"
            name="time"
            type="time"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={handleChange}
            error={!!errors.time}
            helperText={errors.time}
          />
          <TextField
            label="Ubicación"
            name="location"
            fullWidth
            required
            margin="normal"
            value={form.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            label="Categoría"
            name="category"
            select
            fullWidth
            required
            margin="normal"
            value={form.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Costo"
            name="cost"
            type="number"
            fullWidth
            margin="normal"
            value={form.cost}
            onChange={handleChange}
            error={!!errors.cost}
            helperText={errors.cost}
            inputProps={{ min: 0 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Crear Evento"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
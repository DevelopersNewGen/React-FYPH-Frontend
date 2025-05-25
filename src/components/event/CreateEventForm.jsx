import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useCreateEvent } from "../../shared/hooks"; 
import imageCompression from "browser-image-compression";
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
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setErrors((prev) => ({
        ...prev,
        images: "Solo puedes subir hasta 3 imágenes.",
      }));
      setImages([]);
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        images: undefined,
      }));
    }

    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });
        return new File([compressed], file.name, { type: compressed.type });
      })
    );
    setImages(compressedFiles);
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
    if (images.length === 0) errs.images = "Debes subir al menos una imagen";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("location", form.location);
    formData.append("category", form.category);
    formData.append("cost", form.cost !== "" ? form.cost : "0");
    images
      .filter((img) => img instanceof File)
      .forEach((img) => formData.append("pictures", img));
    createEvent(formData, true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
        <Typography variant="h5" mb={2} align="center" fontWeight={600}>
          Crear Evento
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <Box sx={{ display: "flex", gap: 2 }}>
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
              inputProps={{ step: 300 }}
              value={form.time}
              onChange={handleChange}
              error={!!errors.time}
              helperText={errors.time}
            />
          </Box>
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
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              mb: 1,
              fontWeight: 600,
              borderColor: errors.images ? "error.main" : "primary.main",
              color: errors.images ? "error.main" : "primary.main",
            }}
          >
            Subir imágenes
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {errors.images && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {errors.images}
            </Typography>
          )}
          {images.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {images.map((img, i) => (
                <Typography key={i} variant="caption">
                  {img.name}
                </Typography>
              ))}
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Crear Evento"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

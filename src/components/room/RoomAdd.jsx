import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  InputLabel as MuiInputLabel,
  Typography as MuiTypography,
  Paper
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRoomAdd } from '../../shared/hooks/useRoomAdd';
import { useHotels } from '../../shared/hooks/useHotels';
import {
  validateRoomCapacity,
  validateRoomCapacityMessage,
  validateRequiredField,
  validateRequiredFieldMessage,
} from '../../shared/validators';

export default function RoomAdd({ initialData, onSubmit, isEdit, onCancel, hideImages, onlyImages }) {
  const { handleAddRoom, isLoading } = useRoomAdd();
  const { hotels, loadingHotels } = useHotels();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numRoom: '',
    type: '',
    capacity: '',
    pricePerDay: '',
    description: '',
    images: [],
    hotel: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm(prev => ({
        ...prev,
        ...initialData,
        images: [] // siempre limpio imágenes al cargar datos iniciales
      }));
    }
    if (onlyImages) {
      setForm({ images: [] }); // resetea todo si es solo imágenes
    }
  }, [initialData, onlyImages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!onlyImages) {
      if (!validateRequiredField(form.numRoom)) newErrors.numRoom = validateRequiredFieldMessage;
      if (!validateRequiredField(form.type)) newErrors.type = validateRequiredFieldMessage;
      if (!validateRequiredField(form.capacity)) newErrors.capacity = validateRequiredFieldMessage;
      else if (!validateRoomCapacity(form.capacity)) newErrors.capacity = validateRoomCapacityMessage;
      if (!validateRequiredField(form.pricePerDay)) newErrors.pricePerDay = validateRequiredFieldMessage;
      if (!validateRequiredField(form.description)) newErrors.description = validateRequiredFieldMessage;
      if (!validateRequiredField(form.hotel)) newErrors.hotel = validateRequiredFieldMessage;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();

    if (onlyImages || form.images?.length > 0) {
      // Si es solo imágenes, no añado otros campos
      if (!onlyImages) {
        ['numRoom', 'type', 'capacity', 'pricePerDay', 'description', 'hotel'].forEach(key => {
          formData.append(key, form[key]);
        });
      }
      for (let i = 0; i < form.images.length; i++) {
        formData.append('images', form.images[i]);
      }

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await handleAddRoom(formData);
      }
    } else {
      // Si no hay imágenes (y no es solo imágenes), envío objeto simple sin imágenes
      const { images, ...data } = form;
      if (onSubmit) {
        await onSubmit(data);
      } else {
        await handleAddRoom(data);
      }
    }
  };

  return (
    <Box className="section-container" sx={{ marginTop: 8, width: "1000px" }}>
      <video className="section-bg" autoPlay loop muted>
        <source src="https://res.cloudinary.com/daherc5uz/video/upload/v1748216098/ywxwfilf1ajkt1eiiiw7.mp4" type="video/mp4" />
      </video>

      <Paper className="section-form" elevation={4} sx={{
        p: 4, borderRadius: 3, maxWidth: 900,
        mx: "auto",
        display: "flex",
        gap: 4,
        alignItems: "flex-start",
      }}>
        <Box sx={{ minWidth: 250 }}>
    
    <Typography className="section-title" variant="h5" align="center" mb={2}>
      {onlyImages
        ? "Editar imagen de habitación"
        : isEdit
        }
    </Typography>
  </Box>

        <form onSubmit={handleSubmit} autoComplete="off">
          {onlyImages ? (
            <Stack spacing={2}>
              <InputLabel htmlFor="images">Imágenes</InputLabel>
              <OutlinedInput
                id="images"
                name="images"
                type="file"
                inputProps={{ multiple: true, accept: 'image/*' }}
                onChange={handleFileChange}
                fullWidth
                className="section-input"
              />
            </Stack>
          ) : (
            <>
              <TextField
                name="numRoom"
                label="Número de habitación"
                value={form.numRoom}
                onChange={handleChange}
                required
                fullWidth
                error={!!errors.numRoom}
                helperText={errors.numRoom}
                className="section-input"
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth required error={!!errors.type} className="section-input" sx={{ mb: 2 }}>
                <MuiInputLabel id="type-label">Tipo</MuiInputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={form.type}
                  label="Tipo"
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Selecciona un tipo</em></MenuItem>
                  <MenuItem value="SINGLE">SINGLE</MenuItem>
                  <MenuItem value="DOUBLE">DOUBLE</MenuItem>
                  <MenuItem value="SUITE">SUITE</MenuItem>
                  <MenuItem value="DELUXE">DELUXE</MenuItem>
                </Select>
                {errors.type && <MuiTypography color="error" variant="caption">{errors.type}</MuiTypography>}
              </FormControl>

              <TextField
                name="capacity"
                label="Capacidad"
                type="number"
                value={form.capacity}
                onChange={handleChange}
                required
                fullWidth
                error={!!errors.capacity}
                helperText={errors.capacity}
                className="section-input"
                sx={{ mb: 2 }}
              />
              <TextField
                name="pricePerDay"
                label="Precio por noche"
                type="number"
                value={form.pricePerDay}
                onChange={handleChange}
                required
                fullWidth
                error={!!errors.pricePerDay}
                helperText={errors.pricePerDay}
                className="section-input"
                sx={{ mb: 2 }}
              />
              <TextField
                name="description"
                label="Descripción"
                value={form.description}
                onChange={handleChange}
                required
                multiline
                minRows={3}
                fullWidth
                error={!!errors.description}
                helperText={errors.description}
                className="section-input"
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth required error={!!errors.hotel} className="section-input">
                <MuiInputLabel id="hotel-label">Hotel</MuiInputLabel>
                <Select
                  labelId="hotel-label"
                  name="hotel"
                  value={form.hotel}
                  label="Hotel"
                  onChange={handleChange}
                  disabled={loadingHotels}
                >
                  <MenuItem value=""><em>Selecciona un hotel</em></MenuItem>
                  {hotels.map(hotel => (
                    <MenuItem key={hotel.hid} value={hotel.hid}>
                      {hotel.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.hotel && <MuiTypography color="error" variant="caption">{errors.hotel}</MuiTypography>}
              </FormControl>

              {!hideImages && (
                <Stack spacing={2}>
                  <InputLabel htmlFor="images" sx={{ color: "#fff" }}> Imágenes</InputLabel>
                  <OutlinedInput
                    id="images"
                    name="images"
                    type="file"
                    inputProps={{ multiple: true, accept: 'image/*' }}
                    onChange={handleFileChange}
                    fullWidth
                    className="section-input"
                  />
                </Stack>
              )}
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
            className="section-button"
            sx={{ mt: 2 }}
          >
            {isEdit || onlyImages ? 'Guardar Cambios' : isLoading ? 'Agregando...' : 'Agregar'}
          </Button>

          {(isEdit || onlyImages) && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              className="section-button"
              sx={{ mt: 1 }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
        </form>
      </Paper>
    </Box>
  );
}

RoomAdd.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func,
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  hideImages: PropTypes.bool,
  onlyImages: PropTypes.bool,
};

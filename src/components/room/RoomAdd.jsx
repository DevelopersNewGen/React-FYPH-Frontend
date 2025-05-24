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
  Typography as MuiTypography
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
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
        images: []
      }));
    }
    if (onlyImages) {
      setForm({ images: [] });
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
    if (!validateRequiredField(form.numRoom)) newErrors.numRoom = validateRequiredFieldMessage;
    if (!validateRequiredField(form.type)) newErrors.type = validateRequiredFieldMessage;
    if (!validateRequiredField(form.capacity)) newErrors.capacity = validateRequiredFieldMessage;
    else if (!validateRoomCapacity(form.capacity)) newErrors.capacity = validateRoomCapacityMessage;
    if (!validateRequiredField(form.pricePerDay)) newErrors.pricePerDay = validateRequiredFieldMessage;
    if (!validateRequiredField(form.description)) newErrors.description = validateRequiredFieldMessage;
    if (!validateRequiredField(form.hotel)) newErrors.hotel = validateRequiredFieldMessage;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Si hay errores, no enviar

    const formData = new FormData();

    if (onlyImages || form.images?.length > 0) {
      if (!onlyImages) {
        ['numRoom', 'type', 'capacity', 'pricePerDay', 'description', 'hotel'].forEach(key => {
          formData.append(key, form[key]);
        });
      }
      for (let i = 0; i < form.images.length; i++) {
        formData.append('images', form.images[i]);
      }

      onSubmit ? await onSubmit(formData) : await handleAddRoom(formData);
    } else {
      const { images, ...data } = form;
      onSubmit ? await onSubmit(data) : await handleAddRoom(data);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 700,
        mx: 'auto',
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Box>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>

      <Typography variant="h5" fontWeight={600} align="center" mb={2}>
        {onlyImages
          ? 'Editar imagen de habitación'
          : isEdit
          ? 'Editar Habitación'
          : 'Agregar Habitación'}
      </Typography>

      {onlyImages ? (
        <Stack spacing={1}>
          <InputLabel htmlFor="images">Imágenes</InputLabel>
          <OutlinedInput
            id="images"
            name="images"
            type="file"
            inputProps={{ multiple: true, accept: 'image/*' }}
            onChange={handleFileChange}
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
          />

          <FormControl fullWidth required error={!!errors.type}>
            <InputLabel id="type-label">Tipo</InputLabel>
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
          />

          <FormControl fullWidth required error={!!errors.hotel}>
            <InputLabel id="hotel-label">Hotel</InputLabel>
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
            <Stack spacing={1}>
              <InputLabel htmlFor="images">Imágenes</InputLabel>
              <OutlinedInput
                id="images"
                name="images"
                type="file"
                inputProps={{ multiple: true, accept: 'image/*' }}
                onChange={handleFileChange}
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
        sx={{ mt: 2 }}
      >
        {isEdit || onlyImages ? 'Guardar Cambios' : isLoading ? 'Agregando...' : 'Agregar'}
      </Button>

      {(isEdit || onlyImages) && (
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 1 }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      )}
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

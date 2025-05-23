import React, { useState, useEffect } from 'react';
import { useRoomAdd } from '../../shared/hooks/useRoomAdd';
import { useHotels } from '../../shared/hooks/useHotels'; 
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
  FormControl
} from '@mui/material';
import PropTypes from 'prop-types';

export default function RoomAdd({ initialData, onSubmit, isEdit, onCancel, hideImages, onlyImages }) {
  const { handleAddRoom, isLoading } = useRoomAdd();
  const { hotels, loadingHotels } = useHotels();
  const [form, setForm] = useState(
    onlyImages
      ? { images: [] }
      : {
          numRoom: '',
          type: '',
          capacity: '',
          pricePerDay: '',
          description: '',
          images: [],
          hotel: ''
        }
  );

  useEffect(() => {
    if (initialData) {
      setForm(
        onlyImages
          ? { images: [] }
          : { ...initialData, images: [] }
      );
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

    if (onlyImages) {

      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append('images', form.images[i]);
      }
      if (onSubmit) await onSubmit(formData);
      else await handleAddRoom(formData);
    } else {
      const { images, ...data } = form; 
      if (onSubmit) await onSubmit(data);
      else await handleAddRoom(data);
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
        mt: 0,
        p: 0,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
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
          />
          <FormControl fullWidth required>
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
          </FormControl>
          <TextField
            name="capacity"
            label="Capacidad"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="pricePerDay"
            label="Precio por noche"
            type="number"
            value={form.pricePerDay}
            onChange={handleChange}
            required
            fullWidth
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
          />
          <FormControl fullWidth required sx={{ mb: 2 }}>
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
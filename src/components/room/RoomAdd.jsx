import React, { useState } from 'react';
import { useRoomAdd } from '../../shared/hooks/useRoomAdd';
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

export default function RoomAdd() {
  const { handleAddRoom, isLoading } = useRoomAdd();
  const [form, setForm] = useState({
    name: '',
    type: '',
    capacity: '',
    pricePerDay: '',
    description: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'images') {
        for (let i = 0; i < value.length; i++) {
          formData.append('images', value[i]);
        }
      } else {
        formData.append(key, value);
      }
    });
    await handleAddRoom(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h5" fontWeight={600} align="center" mb={2}>
        Agregar Habitación
      </Typography>
      <TextField
        name="name"
        label="Nombre"
        value={form.name}
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
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="doble">Doble</MenuItem>
          <MenuItem value="suite">Suite</MenuItem>
          <MenuItem value="familiar">Familiar</MenuItem>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Agregando...' : 'Agregar'}
      </Button>
    </Box>
  );
}
import React, { useRef, useState } from "react";
import { useHotelAdd } from "../../shared/hooks/useHotelAdd";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const FormAddHotel = () => {
  const { addHotel, loading, success, error } = useHotelAdd();
  const [services, setServices] = useState([{ type: "", description: "", price: "" }]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const formRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const hostId = user?.role === "ADMIN_ROLE" ? user?._id || user?.id : "";

  const handleServiceChange = (idx, field, value) => {
    const newServices = [...services];
    newServices[idx][field] = value;
    setServices(newServices);
  };

  const addService = () => setServices([...services, { type: "", description: "", price: "" }]);
  const removeService = (idx) => setServices(services.length > 1 ? services.filter((_, i) => i !== idx) : services);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const images = form.images.files;

    let hostValue = form.host.value;
    if (!hostValue && hostId) hostValue = hostId;

    if (!hostValue) return alert("Selecciona un Host.");
    if (!images.length) return alert("Debes subir al menos una imagen.");

    const servicesFiltered = services.filter((s) => s.type && s.description && s.price);
    if (servicesFiltered.length === 0) return alert("Debes ingresar al menos un servicio.");

    addHotel({
      name: form.name.value,
      description: form.description.value,
      address: form.address.value,
      telephone: form.telephone.value,
      host: hostValue,
      images: images,
      services: servicesFiltered,
    });
    formRef.current.reset();
    setImagesPreview([]);
    setServices([{ type: "", description: "", price: "" }]);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registrar Hotel
      </Typography>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="name" label="Nombre" required maxLength={50} fullWidth />
          <TextField name="description" label="Descripción" required maxLength={500} multiline rows={4} fullWidth />
          <TextField name="address" label="Dirección" required maxLength={100} fullWidth />
          <TextField
            name="telephone"
            label="Teléfono"
            required
            maxLength={8}
            fullWidth
            inputProps={{ pattern: "[0-9]{8}" }}
          />
          <FormControl fullWidth>
            <InputLabel>Host</InputLabel>
            <Select name="host" defaultValue={hostId || ""} required>
              <MenuItem value={hostId}>{hostId}</MenuItem>
            </Select>
            <FormHelperText>Selecciona un Host</FormHelperText>
          </FormControl>
          <input
            id="images"
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        <label htmlFor="images">
          <Button variant="contained" component="span" fullWidth>
          Subir Imágenes
          </Button>
        </label>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {imagesPreview.map((src, i) => (
              <img key={i} src={src} alt="Preview" height={60} style={{ borderRadius: 8 }} />
            ))}
          </Box>
          <Divider />
          <Stack spacing={2}>
            {services.map((service, idx) => (
              <Grid container spacing={2} key={idx}>
                <Grid item xs={4}>
                  <TextField
                    select
                    label="Tipo"
                    value={service.type}
                    onChange={(e) => handleServiceChange(idx, "type", e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Hotel">Hotel</MenuItem>
                    <MenuItem value="Singleroom">Simple</MenuItem>
                    <MenuItem value="Doubleroom">Doble</MenuItem>
                    <MenuItem value="Suite">Suite</MenuItem>
                    <MenuItem value="Deluxeroom">Deluxe</MenuItem>
                    <MenuItem value="Event">Evento</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Descripción"
                    value={service.description}
                    onChange={(e) => handleServiceChange(idx, "description", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Precio"
                    value={service.price}
                    onChange={(e) => handleServiceChange(idx, "price", e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeService(idx)}
                    disabled={services.length === 1}
                    fullWidth
                  >
                    Eliminar
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" onClick={addService} fullWidth>
              + Agregar Servicio
            </Button>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Guardando..." : "Registrar Hotel"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

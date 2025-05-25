import React, { useRef, useState, useEffect } from "react";
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
  IconButton,
  Paper,
  useTheme
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { getHosts } from "../../services/api";

export const FormAddHotel = () => {
  const { addHotel, loading, success, error } = useHotelAdd();
  const [services, setServices] = useState([{ type: "", description: "", price: "" }]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hosts, setHosts] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getHosts().then(setHosts);
  }, []);

  const handleServiceChange = (idx, field, value) => {
    const newServices = [...services];
    newServices[idx][field] = value;
    setServices(newServices);
  };

  const addService = () => setServices([...services, { type: "", description: "", price: "" }]);

  const removeService = (idx) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== idx));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const hostValue = form.host.value;

    if (!hostValue) return alert("Selecciona un Host.");
    if (!selectedFiles.length) return alert("Debes subir al menos una imagen.");

    const servicesFiltered = services.filter((s) => s.type && s.description && s.price);
    if (servicesFiltered.length === 0) return alert("Debes ingresar al menos un servicio.");

    addHotel({
      name: form.name.value,
      description: form.description.value,
      address: form.address.value,
      telephone: form.telephone.value,
      host: hostValue,
      images: selectedFiles,
      services: servicesFiltered
    });

    formRef.current.reset();
    setImagesPreview([]);
    setSelectedFiles([]);
    setServices([{ type: "", description: "", price: "" }]);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.mode === "dark"
        ? "linear-gradient(120deg, #232526 0%, #28292d 100%)"
        : "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)"
    }}>
      <Paper
        elevation={8}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: { xs: 2, sm: 4 },
          borderRadius: 5,
          background: theme.palette.mode === "dark" ? "rgba(30,30,30,0.98)" : "#fff",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)",
          position: "relative"
        }}
      >
        <IconButton
          onClick={() => navigate("/dashboard")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "primary.main"
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 20, mr: 1 }} />
          Regresar
        </IconButton>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mt: 3, fontWeight: 700, color: "primary.main" }}
        >
          Registrar Hotel
        </Typography>

        <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField name="name" label="Nombre" required fullWidth />
            <TextField name="description" label="Descripción" required multiline rows={4} fullWidth />
            <TextField name="address" label="Dirección" required fullWidth />
            <TextField name="telephone" label="Teléfono" required fullWidth inputProps={{ pattern: "[0-9]{8}" }} />

            <FormControl fullWidth>
              <InputLabel>Host</InputLabel>
              <Select name="host" required defaultValue="">
                <MenuItem value="">Selecciona un Host</MenuItem>
                {hosts.map((h) => (
                  <MenuItem key={h._id} value={h._id}>{h.name} ({h.email})</MenuItem>
                ))}
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
                  <Grid item xs={6}>
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
                  <Grid item xs={10}>
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
                        startAdornment: <InputAdornment position="start">Q</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeService(idx)}
                      disabled={services.length === 1}
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
            {success && <Typography color="success.main">{success}</Typography>}

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
      </Paper>
    </Box>
  );
};


import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import Link from '@mui/joy/Link';
import PropTypes from "prop-types";
import {
  validateEmail,
  validatePassword,
  validateEmailMessage,
} from "../../shared/validators";
import {useLogin} from "../../shared/hooks"
import "../../assets/auth.css";


export const Login = ({switchAuthHandler} ) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmitDisabled =
    isLoading || !formState.email.isValid || !formState.password.isValid;

  return (
     <Box className="auth-container">
      <video className="auth-video" autoPlay loop muted>
        <source src="https://res.cloudinary.com/daherc5uz/video/upload/v1747674005/s37bwfvyccqqzsvvnazj.mp4" type="video/mp4" />
      </video>

      <Paper className="auth-form" elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography className="auth-title" variant="h5" mb={2} align="center">
          Iniciar Sesión
        </Typography>
        <form >
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            className="glass-input"
            value={formState.email.value}
            onChange={e => handleInputValueChange(e.target.value, "email")}
            autoFocus
            helperText={validateEmailMessage}
            onBlur={e => handleInputValidationOnBlur(e.target.value, "email")}
          />  
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            margin="normal"
            className="glass-input"
            value={formState.password.value}
            onChange={e => handleInputValueChange(e.target.value, "password")}
            onBlur={e => handleInputValidationOnBlur(e.target.value, "password")}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="glass-button"
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={isSubmitDisabled}
          >
            Entrar
          </Button>
        </form>
        <Link
          color="transparent"
          underline="always"
          variant="plain"
          className="glass-link"
          onClick={switchAuthHandler}
          sx={{ display: "block", mt: 2, textAlign: "center" }}
        >
            Registrate
        </Link>
      </Paper>
    </Box>
  );
};


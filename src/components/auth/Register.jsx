import PropTypes from "prop-types";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Link, Paper } from "@mui/material";

import {
  validateConfirmPassword,
  validateConfirmPasswordMessage,
  validateEmail,
  validateEmailMessage,
  validatePassword,
  validatePasswordMessage,
  validateUsername,
  validateUsernameMessage,
} from "../../shared/validators";
<<<<<<< HEAD
import { useRegister } from "../../shared/hooks";
import "../../assets/auth.css";
=======

import {useRegister} from "../../shared/hooks"

>>>>>>> origin/event-module

export const Register = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();

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
    username: {
      value: "",
      isValid: false,
      showError: false,
    },
    passwordConfirm: {
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
      case "username":
        isValid = validateUsername(value);
        break;
      case "passwordConfirm":
        isValid = validateConfirmPassword(formState.password.value, value);
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

  const handleRegister = (event) =>{
    event.preventDefault();
    register( formState.username.value, formState.email.value, formState.password.value );
  }

  const isSubmitDisabled =
                    isLoading || 
                    !formState.email.isValid ||
                    !formState.password.isValid ||
                    !formState.username.isValid ||
                    !formState.passwordConfirm.isValid


  return (
    <Box className="auth-container">
      <video className="auth-video" autoPlay loop muted>
        <source src="https://res.cloudinary.com/daherc5uz/video/upload/v1747674005/s37bwfvyccqqzsvvnazj.mp4" type="video/mp4" />
      </video>

      <Paper className="auth-form" elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography className="auth-title"  variant="h5" mb={2} align="center">
          Crear cuenta
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            margin="normal"
             className={formState.email.showError ? "glass-input custom-error" : "glass-input"}
            value={formState.email.value}
            onChange={(e) => handleInputValueChange(e.target.value, "email")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "email")}
            error={formState.email.showError}
            helperText={validateEmailMessage}
          />
          <TextField
            label="Nombre de usuario"
            fullWidth
            required
            margin="normal"
<<<<<<< HEAD
             className={formState.email.showError ? "glass-input custom-error" : "glass-input"}
            value={formState.name.value}
            onChange={(e) => handleInputValueChange(e.target.value, "name")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "name")}
            error={formState.name.showError}
=======
            value={formState.username.value}
            onChange={(e) => handleInputValueChange(e.target.value, "username")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "username")}
            error={formState.username.showError}
>>>>>>> origin/event-module
            helperText={validateUsernameMessage}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            margin="normal"
             className={formState.email.showError ? "glass-input custom-error" : "glass-input"}
            value={formState.password.value}
            onChange={(e) => handleInputValueChange(e.target.value, "password")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "password")}
            error={formState.password.showError}
            helperText={validatePasswordMessage}
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            required
            margin="normal"
             className={formState.email.showError ? "glass-input custom-error" : "glass-input"}
            value={formState.passwordConfirm.value}
            onChange={(e) => handleInputValueChange(e.target.value, "passwordConfirm")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "passwordConfirm")}
            error={formState.passwordConfirm.showError}
            helperText={validateConfirmPasswordMessage}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="glass-button"
            fullWidth
            disabled={isSubmitDisabled}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Registrarse"}
          </Button>
        </form>
        <Link
          color="primary"
          disabled={false}
          underline="always"
          variant="plain"
          className="glass-link"
          onClick={switchAuthHandler}
          sx={{ display: "block", mt: 2, textAlign: "center" }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </Paper>
    </Box>
  );
};

Register.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};
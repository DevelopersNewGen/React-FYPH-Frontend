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

import {useRegister} from "../../shared/hooks"

import "../../assets/style.css";


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
    <Box className="section-container">
      <video className="section-bg" autoPlay loop muted>
        <source src="https://res.cloudinary.com/daherc5uz/video/upload/v1748216098/ywxwfilf1ajkt1eiiiw7.mp4" type="video/mp4" />
      </video>

      <Paper className="section-form" elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography className="section-title"  variant="h5" mb={2} align="center">
          Crear cuenta
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            margin="normal"
            className={formState.email.showError ?  "section-input custom-error" : "section-input"}
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
            className={formState.username.showError ?  "section-input custom-error" : "section-input"}
            value={formState.username.value}
            onChange={(e) => handleInputValueChange(e.target.value, "username")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "username")}
            error={formState.username.showError}
            helperText={validateUsernameMessage}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            margin="normal"
             className={formState.password.showError ?  "section-input custom-error" : "section-input"}
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
             className={formState.passwordConfirm.showError ?  "section-input custom-error" : "section-input"}
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
          className="section-link"
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
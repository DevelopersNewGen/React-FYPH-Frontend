import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { validatePassword, validatePasswordMessage } from '../../shared/validators/validatePassword'
import { validateConfirmPassword, validateConfirmPasswordMessage } from '../../shared/validators/validateConfirmPassword'

export const PasswordForm = ({ onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    let newErrors = {}

    if (!oldPassword) {
      newErrors.oldPassword = 'Debes ingresar tu contraseña actual'
    }
    if (!validatePassword(newPassword)) {
      newErrors.newPassword = validatePasswordMessage
    }
    if (!validateConfirmPassword(newPassword, confirmPassword)) {
      newErrors.confirmPassword = validateConfirmPasswordMessage
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0 && onSubmit) {
      onSubmit({ oldPassword, newPassword })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 350, mx: 'auto', mt: 2 }}
    >
      <Typography variant="h6" align="center">Cambiar Contraseña</Typography>
      <TextField
        label="Contraseña anterior"
        type="password"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        required
        fullWidth
        error={!!errors.oldPassword}
        helperText={errors.oldPassword}
      />
      <TextField
        label="Nueva contraseña"
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        required
        fullWidth
        error={!!errors.newPassword}
        helperText={errors.newPassword}
      />
      <TextField
        label="Confirmar nueva contraseña"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      <Button type="submit" variant="contained" color="primary">
        Cambiar contraseña
      </Button>
    </Box>
  )
}

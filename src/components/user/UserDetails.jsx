import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Box, TextField, CardContent, Avatar, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material'
import { PasswordForm } from './PasswordForm'
import { useUser, useUserAdmin } from '../../shared/hooks'
import EditIcon from '@mui/icons-material/Edit';
import { validateUsername, validateUsernameMessage } from '../../shared/validators/validateUsername'
import { validateEmail, validateEmailMessage } from '../../shared/validators/validateEmail'

export const UserDetails = ({ user, isAdmin, deleteUser }) => {
  const [activeView, setActiveView] = useState('perfil');
  const [editMode, setEditMode] = useState(false);
  const [editPassword, setEditPassword] = useState(user);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const { updatePassword, updateProfilePicture, updateUser } = useUser();
  const { handleSave, handleDelete } = useUserAdmin(isAdmin);
  const fileInputRef = useRef();
  const { uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || ''
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let errorMsg = '';
    if (name === 'name' && !validateUsername(value)) {
      errorMsg = validateUsernameMessage;
    }
    if (name === 'email' && !validateEmail(value)) {
      errorMsg = validateEmailMessage;
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleEditClick = () => {

    if (editMode) {
      if (isAdmin) {
        handleSave(uid, form);
      } else {
        updateUser(form)
      }

    }
    setEditMode(!editMode);
  };

  const handleEditPassword = () => {
    setEditPassword(!editPassword);
  }

  const handleAvatarEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateProfilePicture(file);
    }
  };

  const handleDeleteUser = async () => {
    if (isAdmin) {
      await handleDelete(uid);
      navigate('/user');
    }

    if (!isAdmin) {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');

      if (confirmDelete) {
        await deleteUser();
        navigate('/');
      }
    }
  }

  return (
    <Card sx={{ minWidth: 1250, mx: 'auto', mt: 6, minHeight: 500, display: 'flex' }}>
      <Box sx={{ width: 220, bgcolor: '#f5f5f5', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Menú</Typography>
        <List sx={{ width: '100%' }}>
          <ListItem button onClick={() => setActiveView('perfil')}>
            <ListItemText primary="Perfil" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setActiveView('historial')}>
            <ListItemText primary="Historial" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setActiveView('reservaciones')}>
            <ListItemText primary="Reservaciones" />
          </ListItem>
        </List>
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {activeView === 'perfil' && (
          <>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
              <Avatar
                src={user?.img || ''}
                sx={{ width: 120, height: 120 }}
              />
              {!isAdmin && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'white',
                    borderRadius: '50%',
                    p: 0.5,
                    boxShadow: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={handleAvatarEditClick}
                >
                  <EditIcon fontSize="small" color="action" />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Box>
              )}
            </Box>
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              sx={{ maxWidth: 350, mb: 2 }}
              disabled={!editMode}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              sx={{ maxWidth: 350, mb: 2 }}
              disabled={!editMode}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Button
              onClick={handleEditClick}
            >
              {editMode ? 'Guardar' : 'Editar'}
            </Button>
            <Button
              onClick={handleDeleteUser}
            >
              Eliminar usuario
            </Button>
            {!isAdmin && (
              <Button
                onClick={handleEditPassword}
              >
                {editPassword ? 'Cancelar' : 'Cambiar contraseña'}
              </Button>)
            }
            {editPassword && (
              <PasswordForm
                onSubmit={async (data) => {
                  await updatePassword(data);
                  setEditPassword(false);
                }}
              />
            )}
          </>
        )}

        {activeView === 'historial' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: 800,
              maxHeight: 400,
              overflowY: 'auto',
              bgcolor: '#fafafa',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
            }}
          >
            {user.reservations.length > 0 ? (
              user.reservations.map((reservation) => (
                <Card
                  key={reservation.id}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Habitación: {reservation.room.numRoom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hotel: {reservation.room.hotel.name}
                  </Typography>
                  <Typography variant="body2">
                    Fecha de entrada: {reservation.startDate?.slice(0, 10) || ''}
                  </Typography>
                  <Typography variant="body2">
                    Fecha de salida: {reservation.exitDate?.slice(0, 10) || ''}
                  </Typography>
                  <Typography variant="body2">
                    Estado:{' '}
                    <span style={{ color: reservation.status ? '#2e7d32' : '#757575' }}>
                      {reservation.status ? 'Activa' : 'Pasada'}
                    </span>
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                No tienes historial de reservaciones.
              </Typography>
            )}
          </Box>
        )}

        {activeView === 'reservaciones' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: 800,
              maxHeight: 400,
              overflowY: 'auto',
              bgcolor: '#fafafa',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
            }}
          >
            {user.reservations.length > 0 && user.reservations.some(res => res.status) ? (
              user.reservations
                .filter(reservation => reservation.status)
                .map((reservation) => (
                  <Card
                    key={reservation.id}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      p: 2,
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Habitación: {reservation.room.numRoom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hotel: {reservation.room.hotel.name}
                    </Typography>
                    <Typography variant="body2">
                      Fecha de entrada: {reservation.startDate?.slice(0, 10) || ''}
                    </Typography>
                    <Typography variant="body2">
                      Fecha de salida: {reservation.exitDate?.slice(0, 10) || ''}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#2e7d32' }}>
                      Estado: Activa
                    </Typography>
                  </Card>
                ))
            ) : (
              <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                No tienes reservaciones activas.
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
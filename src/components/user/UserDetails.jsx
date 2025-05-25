import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, Box, TextField, CardContent, Avatar, List, ListItem, ListItemText,
  Divider, Typography, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { PasswordForm } from './PasswordForm';
import { useUser, useUserAdmin } from '../../shared/hooks';
import {
  validateUsername,
  validateUsernameMessage,
  validateEmail,
  validateEmailMessage
} from '../../shared/validators';

export const UserDetails = ({ user, isAdmin, deleteUser }) => {
  const [activeView, setActiveView] = useState('perfil');
  const [editMode, setEditMode] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const { updatePassword, updateProfilePicture, updateUser } = useUser();
  const { handleSave, handleDelete } = useUserAdmin();
  const fileInputRef = useRef();
  const { uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setForm({ name: user?.name || '', email: user?.email || '' });
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
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleEditClick = () => {
    if (editMode) {
      isAdmin ? handleSave(uid, form) : updateUser(form);
    }
    setEditMode(!editMode);
  };

  const handleAvatarEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) updateProfilePicture(file);
  };

  const handleDeleteUser = async () => {
    if (isAdmin) {
      await handleDelete(uid);
      navigate('/user');
    } else {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
      if (confirmDelete) {
        await deleteUser();
        navigate('/');
      }
    }
  };

  return (
    <Card sx={{ minWidth: 1250, mx: 'auto', mt: 6, minHeight: 500, display: 'flex' }}>
      <Box sx={{ width: 220, bgcolor: '#f5f5f5', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Menú</Typography>
        <List sx={{ width: '100%' }}>
          <ListItem button onClick={() => setActiveView('perfil')}><ListItemText primary="Perfil" /></ListItem>
          <Divider />
          <ListItem button onClick={() => setActiveView('historial')}><ListItemText primary="Historial" /></ListItem>
          <Divider />
          <ListItem button onClick={() => setActiveView('reservaciones')}><ListItemText primary="Reservaciones" /></ListItem>
        </List>
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {activeView === 'perfil' && (
          <>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
              <Avatar src={user?.img || ''} sx={{ width: 120, height: 120 }} />
              {!isAdmin && (
                <Box
                  sx={{
                    position: 'absolute', bottom: 8, right: 8, bgcolor: 'white',
                    borderRadius: '50%', p: 0.5, boxShadow: 1, cursor: 'pointer'
                  }}
                  onClick={handleAvatarEditClick}
                >
                  <EditIcon fontSize="small" color="action" />
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
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
            <Button onClick={handleEditClick}>{editMode ? 'Guardar' : 'Editar'}</Button>
            <Button onClick={handleDeleteUser}>Eliminar usuario</Button>
            {!isAdmin && (
              <Button onClick={() => setEditPassword(!editPassword)}>
                {editPassword ? 'Cancelar' : 'Cambiar contraseña'}
              </Button>
            )}
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
          <>
            {user.reservations.map((reservation) => (
              <Box key={reservation.id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1">Habitación: {reservation.room.numRoom}</Typography>
                <Typography variant="body1">Hotel: {reservation.room.hotel.name}</Typography>
                <Typography variant="body1">Fecha de entrada: {reservation.startDate?.slice(0, 10) || ''}</Typography>
                <Typography variant="body1">Fecha de salida: {reservation.exitDate?.slice(0, 10) || ''}</Typography>
                <Typography variant="body1">Estado: {reservation.status ? 'Activa' : 'Pasada'}</Typography>
              </Box>
            ))}
          </>
        )}

        {activeView === 'reservaciones' && (
          <>
            {user.reservations.filter(r => r.status).map((reservation) => (
              <Box key={reservation.id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1">Habitación: {reservation.room.numRoom}</Typography>
                <Typography variant="body1">Hotel: {reservation.room.hotel.name}</Typography>
                <Typography variant="body1">Fecha de entrada: {reservation.startDate?.slice(0, 10) || ''}</Typography>
                <Typography variant="body1">Fecha de salida: {reservation.exitDate?.slice(0, 10) || ''}</Typography>
                <Typography variant="body1">Estado: Activa</Typography>
              </Box>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

import React, { useState, useEffect } from 'react'
import { Card, Box, TextField, CardContent, Avatar, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material'
import { PasswordForm } from './PasswordForm'
import { useUser } from '../../shared/hooks'

export const UserDetails = ({user, isAdmin}) => {
  const [activeView, setActiveView] = useState('perfil');
  const [editMode, setEditMode] = useState(false);
  const [editPassword, setEditPassword] = useState(user);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const { updatePassword } = useUser();

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || ''
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleEditPassword = () => {
    setEditPassword(!editPassword);
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
            <Avatar
              src={user?.img || ''}
              sx={{ width: 120, height: 120, mb: 3 }}
            />
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              sx={{ maxWidth: 350, mb: 2 }}
              disabled={!editMode}
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
            />
            <Button 
              onClick={handleEditClick}
            >
              {editMode ? 'Guardar' : 'Editar'}
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
          <Typography variant="body1">Aquí va el historial del usuario.</Typography>
        )}

        {activeView === 'reservaciones' && (
          <Typography variant="body1">Aquí van las reservaciones del usuario.</Typography>
        )}
      </CardContent>
    </Card>
  )
}

import React from 'react'
import { Card, Box, TextField, CardContent, Avatar, List, ListItem, ListItemText, Divider, Typography } from '@mui/material'

export const UserDetails = ({user}) => {
  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 6, minHeight: 400, display: 'flex' }}>
      <Box sx={{ width: 220, bgcolor: '#f5f5f5', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Menú</Typography>
        <List sx={{ width: '100%' }}>
          <ListItem button>
            <ListItemText primary="Perfil" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Historial" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Reservaciones" />
          </ListItem>
        </List>
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
          src={user?.img || ''}
          sx={{ width: 120, height: 120, mb: 3 }}
        />
        <TextField
          label="Nombre"
          value={user?.name || ''}
          fullWidth
          margin="dense"
          sx={{ maxWidth: 350, mb: 2 }}
        />
        <TextField
          label="Email"
          value={user?.email || ''}
          fullWidth
          margin="dense"
          sx={{ maxWidth: 350, mb: 2 }}
        />
      </CardContent>
    </Card>
  )
}

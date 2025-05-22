import React from 'react'

export const UserDetails = ({user}) => {
  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={user?.img || ''}
            sx={{ width: 80, height: 80 }}
          />
          <TextField
            label="Nombre"
            value={user?.name || ''}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            value={user?.email || ''}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Contraseña"
            value={user?.password || ''}
            type="password"
            InputProps={{ readOnly: true }}
            fullWidth
            margin="dense"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

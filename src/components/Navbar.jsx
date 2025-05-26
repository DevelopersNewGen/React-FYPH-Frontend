import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../shared/hooks';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Container,
  Button
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import '../assets/navbar.css';

const pagesAdmin = ['Hoteles', 'Usuarios', 'Solicitudes', 'Estadisticas', 'Eventos'];
const pagesHost = ['Reservaciones', 'Usuarios', 'Habitaciones', 'Servicios'];
const pagesUser = ['Hoteles', 'Eventos'];

const settings = [
  { icon: MiscellaneousServicesIcon, text: 'Perfil' },
  { icon: HistoryIcon, text: 'Reservaciones' },
  { icon: LogoutIcon, text: 'Cerrar sesion' }
];

export const ResponsiveAppBar = ({ role }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { isLogged, logout } = useUserDetails();
  const user = JSON.parse(localStorage.getItem('user'));
  const img = user?.img;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting.text) {
      case 'Perfil':
        navigate('/profile');
        break;
      case 'Reservaciones':
        navigate('/reservaciones');
        break;
      case 'Cerrar sesion':
        logout();
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const handlePages = (page) => {
    const routes = {
      Hoteles: '/hotels',
      Usuarios: '/user',
      Solicitudes: '/solicitudes',
      Estadisticas: '/estadisticas',
      Eventos: '/eventos',
      Reservaciones: '/reservaciones',
      Habitaciones: '/habitaciones',
      Servicios: '/servicios'
    };
    if (routes[page]) {
      navigate(routes[page]);
    }
  };

  const pages =
    role === 'ADMIN_ROLE'
      ? pagesAdmin
      : role === 'HOST_ROLE'
      ? pagesHost
      : pagesUser;

  return (
    <AppBar position="fixed" className="navbar-appbar">
      <Container maxWidth="xl" className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar">
          <img src="/logo.svg" alt="Logo" style={{ height: 40 }} className="navbar-logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="navbar-title desktop"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            FYPH
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            className="navbar-title desktop"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            FYPH
          </Typography>

          {isLogged ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePages(page)}
                    className="navbar-page-button"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                <Tooltip title="Configuración">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={img} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.text} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <setting.icon fontSize="small" />
                        {setting.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 0, ml: 'auto' }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/auth"
                className="navbar-login-link"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 400,
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Iniciar sesión
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

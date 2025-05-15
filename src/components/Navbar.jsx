import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";

const pagesAdmin = ["Hoteles", "Usuarios", "Solicitudes", "Estadisticas"];
const pagesHost = ["Reservaciones", "Usuarios", "Habitaciones", "Servicios"];
const pagesUser = ["Hoteles", "Eventos"];

const role = "USER_ROLE"; // cambiar por respuesta de hook
const isLogged = true; // cambiar por respuesta del hook

const settings = [
  { icon: MiscellaneousServicesIcon, text: "Perfil" },
  { icon: HistoryIcon, text: "Reservaciones" },
  { icon: LogoutIcon, text: "Cerrar sesion" },
  { icon: HelpIcon, text: "Ayuda" },
];

export const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    // abre menu de avatar
    setAnchorElUser(event.currentTarget);
  };

  const handlePages = (page) => {
    // accion de links de navbar
    if (page === "Eventos") {
      navigate("/eventos");
    }
  };

  const handleCloseUserMenu = () => {
    // cierra menu de avatar
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FYPH
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FYPH
          </Typography>

          {isLogged ? (
            <>
              {role === "USER_ROLE" ? (
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pagesUser.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePages(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              ) : role === "HOST_ROLE" ? (
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pagesHost.map((page) => (
                    <Button
                      key={page}
                      onClick={handlePages}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              ) : role === "ADMIN_ROLE" ? (
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pagesAdmin.map((page) => (
                    <Button
                      key={page}
                      onClick={handlePages}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              ) : null}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={typeof setting === "string" ? setting : setting.text}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {typeof setting === "object" && setting.icon && (
                          <setting.icon sx={{ mr: 1 }} />
                        )}
                        {typeof setting === "object" ? setting.text : setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={handlePages}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Hoteles
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 400,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Iniciar sesion
                  </Typography>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

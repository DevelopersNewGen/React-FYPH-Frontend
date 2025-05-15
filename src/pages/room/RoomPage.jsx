import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';

const role = "HOST_ROLE"; 

export const RoomPage = () => {
  let roleTexts;

  if (role === "ADMIN_ROLE") {
    roleTexts = (
      <>
        <p>Como <strong>Administrador</strong> puedes gestionar todas las habitaciones del sistema.</p>
        <p>Accede a reportes y estadísticas avanzadas de ocupación.</p>
        <p>Puedes asignar o remover habitaciones a cualquier usuario.</p>
      </>
    );
  } else if (role === "HOST_ROLE") {
    roleTexts = (
      <>
        <p>Como <strong>Anfitrión</strong> puedes administrar tus propias habitaciones.</p>
        <p>Gestiona reservas y disponibilidad fácilmente.</p>
        <p>Actualiza la información y servicios de tus habitaciones.</p>
      </>
    );
  } else if (role === "USER_ROLE") {
    roleTexts = (
      <>
        <p>Como <strong>Usuario</strong> puedes ver y reservar habitaciones disponibles.</p>
        <p>Consulta detalles, servicios y precios de cada habitación.</p>
        <p>Revisa el historial de tus reservaciones en esta sección.</p>
      </>
    );
  } else {
    roleTexts = (
      <>
        <p>Por favor inicia sesión para ver información personalizada.</p>
      </>
    );
  }

  return (
    <div>
      <div>
        <ResponsiveAppBar />
        <h1>Habitaciones</h1>
        <p>Bienvenido a la página de habitaciones.</p>
        {roleTexts}
      </div>
    </div>
  );
}
import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import RoomDetails from '../../components/room/RoomDetails.jsx';
import RoomDetailsClient from '../../components/room/RoomDetailsClient.jsx';
import './Room.css'; 

const role = "CLIENT_ROLE"; 

export const RoomDetailsPage = () => {
  let content;

  if (role === "ADMIN_ROLE" || role === "HOST_ROLE") {
    content = <RoomDetails />;
  } else if (role === "CLIENT_ROLE") {
    content = <RoomDetailsClient />;
  } else {
    content = (
      <p>Por favor inicia sesión para ver información personalizada.</p>
    );
  }

  return (
    <div className="room-page-container">
      <ResponsiveAppBar />
      <div className="room-header">
        <h1>Detalles de la Habitación</h1>
        <p>Consulta la información detallada de la habitación seleccionada.</p>
      </div>
      <div className="room-card-wrapper">
        {content}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
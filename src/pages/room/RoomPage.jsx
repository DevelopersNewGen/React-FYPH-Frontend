import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import RoomCard from '../../components/room/RoomCard.jsx';
import './Room.css';
import { useRooms, useUser } from '../../shared/hooks';

export const RoomPage = () => {
  const { allRooms, isFetching } = useRooms();
    const { role } = useUser();

    console.log(role)
    
  return (
    <div className="room-page-container">
      <ResponsiveAppBar role={role}/>
      <div className="room-header">
        <h1>Habitaciones</h1>
        <p>Bienvenido a la página de habitaciones.</p>
      </div>
      <div className="room-card-wrapper">
        <RoomCard room={{}} showAddButton={true} role={role}/>
        <div className="room-list-grid">
          {isFetching ? (
            <p>Cargando habitaciones...</p>
          ) : allRooms.length === 0 ? (
            <p>No hay habitaciones registradas.</p>
          ) : (
            allRooms.map(room => (
              <RoomCard key={room.rid || room._id} room={room} showAddButton={false} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
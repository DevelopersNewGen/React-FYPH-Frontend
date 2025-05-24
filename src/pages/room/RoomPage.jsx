import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import RoomCard from '../../components/room/RoomCard.jsx';
import RoomAddButton from '../../components/room/RoomAddButton.jsx';
import './Room.css';
import { useRooms, useUser } from '../../shared/hooks';

export const RoomPage = () => {
  const { allRooms, isFetching } = useRooms();
  const { role } = useUser();

  return (
    <div className="room-page-container">
      <ResponsiveAppBar role={role} />
      <div className="room-header">
        <h1>Habitaciones</h1>
        <p>Bienvenido a la página de habitaciones.</p>
        <RoomAddButton />
      </div>

      <div className="room-card-wrapper">
        <div className="room-list-grid">
          {isFetching ? (
            <p>Cargando habitaciones...</p>
          ) : allRooms.length === 0 ? (
            <p>No hay habitaciones registradas.</p>
          ) : (
            allRooms.map((room) => (
              <RoomCard
                key={room.rid || room._id}
                room={room}
                role={role}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import RoomCard from '../../components/room/RoomCard.jsx';
import RoomAddButton from '../../components/room/RoomAddButton.jsx';
import RoomFilter from '../../components/room/RoomFilter.jsx';
import './Room.css';
import { useRooms, useUser } from '../../shared/hooks';

export const RoomPage = () => {
  const { allRooms, isFetching } = useRooms();
  const { role } = useUser();

  const [filteredRooms, setFilteredRooms] = useState([]);

  return (
    <div className="room-page-container" style={{ marginTop: 80 }}>
      <ResponsiveAppBar role={role} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
        <div className="room-header">
          <h1>Habitaciones</h1>
          <p>Bienvenido a la página de habitaciones.</p>
          <RoomAddButton />
          <div style={{ marginTop: 24 }}>
            <RoomFilter
              allRooms={allRooms}
              onFilteredRoomsChange={setFilteredRooms}
            />
          </div>
        </div>
      </div>

      <div className="room-card-wrapper">
        <div className="room-list-grid">
          {isFetching ? (
            <p>Cargando habitaciones...</p>
          ) : filteredRooms.length === 0 ? (
            <p>No hay habitaciones que coincidan con el filtro.</p>
          ) : (
            filteredRooms.map((room) => (
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

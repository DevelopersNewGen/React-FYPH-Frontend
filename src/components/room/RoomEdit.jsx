import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../../services/api'; // Asegúrate de tener updateRoom en tu api.jsx
import RoomAdd from './RoomAdd';

export default function RoomEdit() {
  const { rid } = useParams();
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    async function fetchRoom() {
      const res = await getRoomById(rid);
      if (!res.error) setRoomData(res.data.room);
    }
    fetchRoom();
  }, [rid]);

  if (!roomData) return <div>Cargando...</div>;

  
  return (
    <RoomAdd
      initialData={roomData}
      onSubmit={async (formData) => {
        await updateRoom(rid, formData); 
      }}
      isEdit
    />
  );
}
import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar';
import { useRoomDetails } from '../../shared/hooks/useRoomDetails';
import RoomDetailsComponent from '../../components/room/RoomDetails';
import './RoomDetails.css';
import { useUser } from '../../shared/hooks/';

export default function RoomDetailsPage() {
  const { room, loading } = useRoomDetails();
  const { role } = useUser();
  return (
    <div>
      <ResponsiveAppBar role={role}/>
      <RoomDetailsComponent room={room} loading={loading}  role={role} />
    </div>
  );
}
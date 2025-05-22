import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar';
import { useRoomDetails } from '../../shared/hooks/useRoomDetails';
import './RoomDetails';
import RoomDetailsComponent from '../../components/room/RoomDetails';

export default function RoomDetailsPage() {
  const { room, loading } = useRoomDetails();

  return (
    <div>
      <ResponsiveAppBar />
      <RoomDetailsComponent room={room} loading={loading} />
    </div>
  );
}
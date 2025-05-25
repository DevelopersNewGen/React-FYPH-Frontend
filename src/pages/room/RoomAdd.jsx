import React from 'react';
import RoomAdd from '../../components/room/RoomAdd';
import { ResponsiveAppBar } from '../../components/Navbar';
import { useUser } from '../../shared/hooks';
export default function RoomAddPage() {
  const { role } = useUser();
  return (
    <>
      <ResponsiveAppBar role={role}/>
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <RoomAdd role={role}/>
      </div>
    </>
  );
}
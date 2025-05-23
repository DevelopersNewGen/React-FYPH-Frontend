import React from 'react';
import RoomAdd from '../../components/room/RoomAdd';
import { ResponsiveAppBar } from '../../components/Navbar';

export default function RoomAddPage() {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <RoomAdd />
      </div>
    </>
  );
}
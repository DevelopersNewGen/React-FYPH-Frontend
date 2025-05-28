import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomsByHotel } from "../../services/api";
import RoomCard from "../../components/room/RoomCard";
import { Typography, Box } from "@mui/material";
import './Room.css';
import { ResponsiveAppBar } from "../../components/Navbar";
import { useUser } from "../../shared/hooks";
import RoomAddButton from "../../components/room/RoomAddButton";
import RoomFilter from "../../components/room/RoomFilter"; 

export default function RoomCardByHotel() {
  const { hid } = useParams();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useUser();

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const res = await getRoomsByHotel(hid);
      if (res.data && res.data.rooms) {
        setRooms(res.data.rooms);
        setFilteredRooms(res.data.rooms);
      } else {
        setRooms([]);
        setFilteredRooms([]);
      }
      setLoading(false);
    };
    fetchRooms();
  }, [hid]);

  return (
    <>
      <ResponsiveAppBar role={role} />
      <Box className="room-page-container" sx={{ paddingTop: "500px" }}>
        <Typography variant="h3" className="room-header" gutterBottom>
          Habitaciones del hotel
        </Typography>
        <RoomAddButton />
        <div style={{ marginTop: 24, marginBottom: 24, width: "100%" }}>
          <RoomFilter allRooms={rooms} onFilteredRoomsChange={setFilteredRooms} />
        </div>
        {loading ? (
          <Typography>Cargando habitaciones...</Typography>
        ) : filteredRooms.length === 0 ? (
          <Typography>No hay habitaciones para este hotel.</Typography>
        ) : (
          <div className="room-list-grid">
            {filteredRooms.map((room) => (
              <RoomCard key={room._id || room.rid} room={room} />
            ))}
          </div>
        )}
      </Box>
    </>
  );
}
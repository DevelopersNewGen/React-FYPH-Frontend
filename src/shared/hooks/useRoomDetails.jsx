import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getRoomById } from '../../services/api';

export const useRoomDetails = () => {
  const { rid } = useParams(); 
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      const res = await getRoomById(rid); 
      if (res.error) {
        toast.error(res.e?.response?.data?.message || 'Error al obtener la habitación');
        setLoading(false);
        return;
      }
      setRoom(res.data.room);
      setLoading(false);
    };
    if (rid) fetchRoom();
  }, [rid]);

  return { room, loading };
};
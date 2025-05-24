import React from 'react';
import { useUser, useRoomUpdate } from '../../shared/hooks';
import RoomAdd from './RoomAdd';

export default function RoomEdit({ roomData, onClose, hideImages, onlyImages }) {
  const { role } = useUser();
  const { handleUpdateRoom, handleUpdateRoomImages } = useRoomUpdate();

  const onSubmit = async (dataOrFormData) => {
    if (onlyImages) {
      await handleUpdateRoomImages(roomData.rid || roomData._id, dataOrFormData);
    } else {
      await handleUpdateRoom(roomData.rid || roomData._id, dataOrFormData);
    }
    onClose();
    window.location.reload(); 
  };

  if (!roomData) return <div>Cargando...</div>;
  if (role !== "ADMIN_ROLE" && role !== "HOST_ROLE") {
    return <div>No tienes permisos para editar esta habitación.</div>;
  }

  return (
    <RoomAdd
      initialData={roomData}
      onSubmit={onSubmit}
      isEdit
      onCancel={onClose}
      hideImages={hideImages}
      onlyImages={onlyImages}
    />
  );
}
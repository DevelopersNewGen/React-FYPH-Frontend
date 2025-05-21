import React from 'react';
import HotelCard from '../hotel/hotelCard.jsx'; 
import '../../pages/hotelPage/Hotel.css';

export const CardHotelDash = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return <p>No hay hoteles disponibles.</p>;
  }

  return (
    <div className="hotel-list-grid">
      {hotels.map(hotel => (
        <HotelCard key={hotel.hid || hotel.id || hotel._id} hotel={hotel} />
      ))}
    </div>
  );
};

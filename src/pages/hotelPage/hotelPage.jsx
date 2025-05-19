import React from 'react';
import HotelCard from '../../components/hotel/hotelCard';
import {ResponsiveAppBar} from '../../components/Navbar.jsx';

export const HotelPage = () => {
  const hotels = [
    {
      id: 1,
      name: 'Hotel Paradise',
      location: 'Ciudad de Guatemala',
      description: 'Un hotel de lujo con todas las comodidades.',
      pricePerNight: 500,
      images: ['https://via.placeholder.com/345x180?text=Hotel+1']
    },
    {
      id: 2,
      name: 'Hotel Vista Hermosa',
      location: 'Antigua Guatemala',
      description: 'Hermosas vistas y excelente servicio.',
      pricePerNight: 300,
      images: ['https://via.placeholder.com/345x180?text=Hotel+2']
    }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', padding: '16px' }}>
      <ResponsiveAppBar />
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

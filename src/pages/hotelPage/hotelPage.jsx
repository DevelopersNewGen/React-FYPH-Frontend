import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { FormAddHotel } from "../../components/hotel/FormAddHotel.jsx";
import "../hotelPage/Hotel.css";
import { useUser } from '../../shared/hooks';

export const HotelPage = () => {
  const { role } = useUser();
  return (
    <div className="hotel-page-container">
       <ResponsiveAppBar role={role} />
      <header className="hotel-header">
        <h1>Registrar Hotel</h1>
      </header>
      <FormAddHotel />
    </div>
  );
};

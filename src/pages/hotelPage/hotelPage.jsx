import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { FormAddHotel } from "../../components/hotel/FormAddHotel.jsx";
import "../hotelPage/Hotel.css";

export const HotelPage = () => {
  return (
    <div className="hotel-page-container">
      <ResponsiveAppBar />
      <header className="hotel-header">
        <h1>Registrar Hotel</h1>
      </header>
      <FormAddHotel />
    </div>
  );
};

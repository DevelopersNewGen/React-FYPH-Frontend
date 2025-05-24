import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { FormAddHotel } from "../../components/hotel/FormAddHotel.jsx";

export const HotelAddPage = () => (
  <>
    <ResponsiveAppBar />
    <div style={{ marginTop: "90px" }}>
      <FormAddHotel />
    </div>
  </>
);

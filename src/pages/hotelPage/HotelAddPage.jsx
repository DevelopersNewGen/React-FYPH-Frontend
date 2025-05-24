import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { FormAddHotel } from "../../components/hotel/FormAddHotel.jsx";
import {  useUser } from '../../shared/hooks';

export const HotelAddPage = () => {
  const { role } = useUser();

  return (
  <>
    <ResponsiveAppBar role={role} />
    <div style={{ marginTop: "90px" }}>
      <FormAddHotel />
    </div>
  </>
  );
};

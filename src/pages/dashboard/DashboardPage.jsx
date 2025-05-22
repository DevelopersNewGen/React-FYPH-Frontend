import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import { CardHotelDash } from "../../components/dashboardHotel/CardHotelDash.jsx";
import { useHotelList } from '../../shared/hooks/useHotelList.jsx';

export const DashboardPage = () => {
  const { hotels, loading, error } = useHotelList();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const role = user?.role || null;

  if (role !== "CLIENT_ROLE") {
    return (
      <>
        <ResponsiveAppBar />
        <p style={{ padding: "1rem" }}>No tienes permiso para ver esta sección.</p>
      </>
    );
  }

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: "1rem" }}>
        <h1>Hoteles disponibles</h1>
        {loading && <p>Cargando hoteles...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <CardHotelDash hotels={hotels} />}
      </div>
    </>
  );
};

import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import HotelCard from "../../components/hotel/hotelCard.jsx";
import { useHotelList } from '../../shared/hooks/useHotelList.jsx';
import Button from '@mui/material/Button';
import './Hotel.css';

export const DashboardPage = () => {
  // Obtener usuario desde localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const role = user?.role || null;

  // Listar hoteles solo si hay usuario
  const { hotels, loading, error } = user
    ? useHotelList()
    : { hotels: [], loading: false, error: null };

  const handleAddHotel = () => {
    // Aquí puedes mostrar un modal, navegar al form o lo que prefieras
    alert("Agregar hotel (implementa la lógica aquí)");
  };

  if (!user) {
    return (
      <>
        <ResponsiveAppBar />
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <h1>Debes iniciar sesión para ver los hoteles</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
            justifyContent: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Hoteles disponibles</h1>
          {role === "ADMIN_ROLE" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddHotel}
              style={{ minWidth: 150, fontWeight: "bold" }}
            >
              Agregar hotel
            </Button>
          )}
        </div>
        {loading && <p>Cargando hoteles...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className="hotel-list-grid">
            {hotels.map((hotel) => (
              <div key={hotel.hid || hotel.id || hotel._id} style={{ position: "relative" }}>
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

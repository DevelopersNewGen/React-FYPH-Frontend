import React from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import HotelCard from "../../components/hotel/hotelCard.jsx";
import { useHotelList } from '../../shared/hooks/useHotelList.jsx';

export const DashboardPage = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const role = user?.role || null;

  // Solo carga hoteles si hay usuario logueado
  const { hotels, loading, error } = user ? useHotelList() : { hotels: [], loading: false, error: null };

  // Handlers de ejemplo para los botones
  const handleAddHotel = () => {
    alert("Agregar hotel (implementa la lógica aquí)");
  };
  const handleEditHotel = (hotelId) => {
    alert(`Editar hotel ${hotelId} (implementa la lógica aquí)`);
  };
  const handleDeleteHotel = (hotelId) => {
    alert(`Eliminar hotel ${hotelId} (implementa la lógica aquí)`);
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
      <h1>Hoteles disponibles</h1>
      {loading && <p>Cargando hoteles...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div className="hotel-list-grid">
          {hotels.map(hotel => (
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

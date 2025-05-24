import React, { useEffect, useState } from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import HotelCard from "../../components/hotel/hotelCard.jsx";
import { useUser } from '../../shared/hooks';
import Button from '@mui/material/Button';
import { getHotels } from '../../services';
import { useNavigate } from "react-router-dom";
import '../hotelPage/Hotel.css';

export const DashboardPage = () => {
  const { role, isLoading: userLoading } = useUser();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchKey, setRefetchKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) return;
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHotels();
        setHotels(data.hotels || []);
      } catch (err) {
        setError("Error al cargar hoteles.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [role, refetchKey]);

  const handleAddHotel = () => {
    navigate("/hotels/add");
  };

  if (userLoading) return <div style={{textAlign: "center", marginTop: "120px", fontSize: "2rem"}}>Cargando usuario...</div>;

  if (!role) {
    return (
      <>
        <ResponsiveAppBar />
        <div style={{
          textAlign: "center",
          marginTop: "120px",
          fontWeight: "bold",
          fontSize: "2.5rem"
        }}>
          Debes iniciar sesión para ver los hoteles
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

        {loading && <p style={{ textAlign: "center" }}>Cargando hoteles...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {!loading && !error && (
          <div className="hotel-list-grid" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            {hotels.length === 0 ? (
              <p style={{ textAlign: "center" }}>No hay hoteles disponibles.</p>
            ) : (
              hotels.map((hotel, idx) => (
                <div
                  key={hotel._id || hotel.id || idx}
                  style={{ position: "relative", width: "100%", maxWidth: 350 }}
                >
                  <HotelCard hotel={hotel} setRefetchKey={setRefetchKey} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

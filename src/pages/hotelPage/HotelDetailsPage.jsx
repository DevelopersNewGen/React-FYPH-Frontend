import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHotelDetails } from "../../shared/hooks/useHotelDetails.jsx";
import CardDetails from "../../components/hotel/CardDetails.jsx";
import EditHotel from "../../components/hotel/EditHotel.jsx";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import "./Hotel.css";
import { useUser } from '../../shared/hooks';

export const HotelDetailsPage = () => {
  const { role } = useUser();
  const { hid } = useParams();
  const [editing, setEditing] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  
  const { hotel, loading, error } = useHotelDetails(hid, refetchKey);

  
  const handleSuccess = () => {
    setEditing(false);
    setRefetchKey(k => k + 1); 
  };

  if (loading) return <p className="loading">Cargando detalles del hotel...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="hotel-page-container" style={{ marginTop: "80px" }}>
      <ResponsiveAppBar role={role} />
      <header className="hotel-header">
        <h1>Detalle del Hotel</h1>
      </header>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "2rem",
        marginTop: 32
      }}>
        {hotel && (
          <>
            <CardDetails hotel={hotel} onEdit={() => setEditing(true)} />
            {editing && (
              <EditHotel
                hotel={hotel}
                onClose={() => setEditing(false)}
                onSuccess={handleSuccess}
                setRefetchKey={setRefetchKey}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

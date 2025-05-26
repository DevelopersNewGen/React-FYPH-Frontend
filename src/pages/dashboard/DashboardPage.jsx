import React, { useEffect, useState } from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import HotelCard from '../../components/hotel/hotelCard.jsx';
import { useUser } from '../../shared/hooks';
import Button from '@mui/material/Button';
import { getHotels } from '../../services';
import { useNavigate } from 'react-router-dom';
import '../hotelPage/Hotel.css';
import '../../assets/style.css';

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
        setError('Error al cargar hoteles.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [role, refetchKey]);

  const handleAddHotel = () => {
    navigate('/hotels/add');
  };

  if (userLoading) {
    return (
      <>
        <ResponsiveAppBar role={role} />
        <div style={{ textAlign: 'center', marginTop: '120px', fontSize: '2rem' }}>
          Cargando usuario...
        </div>
      </>
    );
  }

  return (
    <>
      <ResponsiveAppBar role={role} />

      {!role ? (
        <div style={{ padding: '2rem', textAlign: 'center', marginTop: '100px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            Debes iniciar sesión para ver los hoteles
          </h1>
          <video
            src="https://res.cloudinary.com/daherc5uz/video/upload/v1748146124/mkhsf8wrb8d995rzxa4d.mp4"
            autoPlay
            muted
            loop
            style={{ maxWidth: '100%', borderRadius: '12px' }}
          />
        </div>

      ) : (
        <div style={{ padding: '1rem', marginTop: '80px' }}>
          {role === 'ADMIN_ROLE' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: '2rem',
                marginBottom: '1.5rem',
                width: '100%'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddHotel}
                style={{ minWidth: 150, fontWeight: 'bold' }}
              >
                AGREGAR HOTEL
              </Button>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2rem',
              marginTop: '0'
            }}
          >
            <h1 style={{ margin: 0, fontSize: '2.5rem', textAlign: 'center' }}>
              Hoteles disponibles
            </h1>
          </div>

          {loading && <p style={{ textAlign: 'center' }}>Cargando hoteles...</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          {!loading && !error && hotels.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '1.25rem', marginBottom: '2rem' }}>
              No hay hoteles disponibles.
            </p>
          )}
          {!loading && !error && hotels.length > 0 && (
            <div
              className="hotel-list-grid"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2rem',
                width: '100%',
                margin: '0 auto'
              }}
            >
              {hotels.map((hotel, idx) => (
                <div
                  key={hotel._id || hotel.id || idx}
                  style={{
                    position: 'relative',
                    width: 350,
                    minWidth: 300,
                    maxWidth: 370,
                    flex: '1 1 340px'
                  }}
                >
                  <HotelCard hotel={hotel} setRefetchKey={setRefetchKey} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
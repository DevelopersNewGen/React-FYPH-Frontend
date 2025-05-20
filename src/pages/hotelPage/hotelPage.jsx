import React from "react"
import HotelCard from "../../components/hotel/hotelCard.jsx"
import { ResponsiveAppBar } from "../../components/Navbar.jsx"
import { useHotelList } from "../../shared/hooks/useHotelList.jsx"
import "./Hotel.css"

export const HotelPage = () => {
  const { hotels, loading, error } = useHotelList()

  return (
    <div className="hotel-page-container">
      <ResponsiveAppBar />
      <header className="hotel-header">
        <h1>Hoteles Disponibles</h1>
      </header>

      {loading && <p className="loading">Cargando hoteles...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && hotels.length === 0 && (
        <p>No hay hoteles disponibles.</p>
      )}

      {!loading && !error && hotels.length > 0 && (
        <div className="hotel-list-grid">
          {hotels.map(hotel => (
            <HotelCard key={hotel.hid || hotel.id || hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  )
}

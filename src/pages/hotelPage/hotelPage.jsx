import React, { useEffect, useState } from "react"
import HotelCard from "../../components/hotel/hotelCard"
import { ResponsiveAppBar } from "../../components/Navbar.jsx"
import { getHotels } from "../../service/index.js"
import "./Hotel.css"

export const HotelPage = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels()
        setHotels(data.hotels || []) 
      } catch (err) {
        setError("Error al cargar los hoteles. Inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  return (
    <div className="room-page-container">
      <ResponsiveAppBar />
      <header className="room-header">
        <h1>Hoteles Disponibles</h1>
      </header>
      {loading ? (
        <p>Cargando hoteles...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(hotels) && hotels.length > 0 ? (
        <div className="room-list-grid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.hid} hotel={hotel} />
          ))}
        </div>
      ) : (
        <p>No hay hoteles disponibles.</p>
      )}
    </div>
  )
}

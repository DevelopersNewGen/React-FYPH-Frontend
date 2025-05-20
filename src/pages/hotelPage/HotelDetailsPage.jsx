import React from "react"
import { useParams } from "react-router-dom"
import { useHotelDetails } from "../../shared/hooks/useHotelDetails.jsx"
import CardDetails from "../../components/hotel/CardDetails.jsx"
import { ResponsiveAppBar } from "../../components/Navbar.jsx"
import "./Hotel.css"

export const HotelDetailsPage = () => {
  const { hid } = useParams()
  const { hotel, loading, error } = useHotelDetails(hid)

  return (
    <div className="hotel-page-container">
      <ResponsiveAppBar />
      <header className="hotel-header">
        <h1>Detalle del Hotel</h1>
      </header>

      {loading && <p className="loading">Cargando detalles del hotel...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && hotel && <CardDetails hotel={hotel} />}
    </div>
  )
}

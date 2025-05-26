import { useEffect, useState } from "react"
import { getHotelById } from "../../services/index.js"

export const useHotelDetails = (hotelId, refetchKey = 0) => {
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hotelId) return
    const fetchHotel = async () => {
      try {
        const data = await getHotelById(hotelId)
        setHotel(data.hotel)
      } catch (err) {
        setError("No se pudo cargar el hotel. Inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }
    fetchHotel()
  }, [hotelId, refetchKey]) 

  return { hotel, loading, error }
}

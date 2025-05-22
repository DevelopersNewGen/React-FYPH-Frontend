import { useEffect, useState } from "react"
import { getHotels } from "../../services"

export const useHotelList = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels()
        console.log("Respuesta hoteles:", data) // <-- Agrega esto
        setHotels(data.hotels || [])
      } catch (err) {
        setError("Error al cargar los hoteles. Inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  return { hotels, loading, error }
}

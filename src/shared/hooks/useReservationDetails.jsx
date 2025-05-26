import { useEffect, useState } from 'react'
import { getReservationById } from '../../services/api'

export const useReservationById = (rid) => {
    const [reservation, setReservation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!rid) return
        const fetchReservation = async () => {
            try {
                const data = await getReservationById(rid)
                setReservation(data.reservation)
            } catch (err) {
                setError('No se pudo cargar la reservación. Inténtalo de nuevo más tarde.')
            } finally {
                setLoading(false)
            }
        }
        fetchReservation()
    }, [rid])

    return { reservation, loading, error }
}
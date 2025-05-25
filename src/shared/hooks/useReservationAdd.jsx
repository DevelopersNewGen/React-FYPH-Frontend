import { useState } from 'react'
import toast from 'react-hot-toast'
import { createReservation } from '../../services/api'

export const useReservationAdd = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleAddReservation = async (rid, formData) => {
    setIsLoading(true)
    setIsSuccess(false)
    console.log('formData:', formData)
    console.log('rid:', rid)
    const res = await createReservation(rid, formData)
    console.log('respuesta de la API:', res)

    if (res.error) {
      toast.error(res.e?.response?.data?.message || 'Error al crear la reservación')
      setIsLoading(false)
      return false
    }

    setIsLoading(false)
    setIsSuccess(true)
    return true
  }

  return {
    handleAddReservation,
    isLoading,
    isSuccess,
  }
}
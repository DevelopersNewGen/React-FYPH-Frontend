import { useNavigate } from "react-router-dom"
import { register as registerRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async (name, email, password) => {
        setIsLoading(true)

        const response = await registerRequest({
            name,
            email,
            password
        })

        setIsLoading(false)

        if (response.error) {
            const errorMessage = response.e?.response?.data?.message || "Error al registrarse"
            toast.error(errorMessage)
            return
        }

        if (!response.data) {
            toast.error("La respuesta del servidor no contiene datos")
            return
        }

        const { name: userName, email: userEmail} = response.data

        if (!userName || !userEmail) {
            toast.error("No se pudo obtener la información del usuario")
            return
        }

        const userDetails = { name: userName, email: userEmail  }
        localStorage.setItem("user", JSON.stringify(userDetails))
        toast.success(response.data.message)
        navigate("/")
    }

    return {
        register,
        isLoading
    }
}
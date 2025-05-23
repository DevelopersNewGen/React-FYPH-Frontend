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
            const errorMessage = response.e?.response?.data?.errors?.[0]?.msg || "Error al registrarse"
            toast.error(errorMessage)
            return
        }

        if (!response.data) {
            toast.error("La respuesta del servidor no contiene datos")
            return
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails))
        navigate("/");
        window.location.reload();
    }

    return {
        register,
        isLoading
    }
}
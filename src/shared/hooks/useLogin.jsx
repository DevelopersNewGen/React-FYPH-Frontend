import { useNavigate } from "react-router-dom"
import { login as loginRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    
    const login = async (email, password) => {

        setIsLoading(true)

        const response = await loginRequest({
            email,
            password
        })

        setIsLoading(false)

        if(response.error){
            toast.error(response.e?.response?.data || "Error iniciar sesión")
        }else{
            toast.success(response.data.msg)
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails))

        navigate("/")
    }

    return{
        login,
        isLoading
    }
}
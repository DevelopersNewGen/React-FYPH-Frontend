import { login as loginRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    
    const login = async (email, password) => {

        setIsLoading(true)

        const response = await loginRequest({
            email,
            password
        })

        setIsLoading(false)

        if(response.error){
            toast.error(response.e?.response?.data?.message || "Error iniciar sesión")
            return;
        }else{
            toast.success(response.data.msg)
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails))
        navigate("/");
        window.location.reload();
        

    }

    return{
        login,
        isLoading
    }
}
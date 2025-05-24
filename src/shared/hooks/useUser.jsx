import { useState , useEffect} from "react";

import {
    getUser as fetchUser,
    updatePassword as updateUserPassword
} from "../../services";
import toast from "react-hot-toast";

export const useUser = () => {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const getUser = async () => {
        setIsLoading(true)

        try {
            const data = await fetchUser()
            setUser(data.data.user)
            setRole(data.data.user.role);
            setIsLoading(false)
        } catch (err) {
            return err.message
        }
    }
    
    const updatePassword = async ({ oldPassword, newPassword }) => {
        setIsLoading(true)
        try {
            const data = await updateUserPassword({ oldPassword, newPassword })
            toast.success(data.data.message)
            setIsLoading(false)
        } catch (err) {
            toast.error("La contraseña anterior no coincide");
            setIsLoading(false);
            return;
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    return {
        role,
        isLoading,
        user,
        getUser,
        updatePassword
    };
}
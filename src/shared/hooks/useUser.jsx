import { useState , useEffect} from "react";
import toast from "react-hot-toast";

import {
    getRole as fetchRole
} from "../../services";

export const useUser = () => {
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getRole = async () => {
        setIsLoading(true);
        try {
            const data = await fetchRole(); 
            setRole(data.data.role);
        } catch (err) {
            toast.error("Error al obtener el role: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRole(); 
    }, []);

    return {
        role,
        getRole,
        isLoading,
    };
}
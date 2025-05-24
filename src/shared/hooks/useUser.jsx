import { useState, useEffect } from "react";
import { getUser as fetchUser } from "../../services";

export const useUser = () => {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);

    const getUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUser();
            const userData = data?.data?.user || data?.user || data;
            if (userData && userData.role) {
                setUser(userData);
                setRole(userData.role);
            } else {
                setError("No autorizado o usuario no encontrado");
            }
        } catch (err) {
            setError("Error de autenticación o backend");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return {
        role,
        user,
        isLoading,
        error,
        getUser
    };
};
import { useState , useEffect} from "react";

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
            return err.message
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
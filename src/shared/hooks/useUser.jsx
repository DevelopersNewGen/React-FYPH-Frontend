import { useState , useEffect} from "react";

import {
    getUser as fetchUser
} from "../../services";

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
        } catch (err) {
            return err.message
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    return {
        role,
        isLoading,
        user,
        getUser
    };
}
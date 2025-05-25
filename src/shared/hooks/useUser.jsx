import { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom'; 

import {
    getUser as fetchUser,
    updatePassword as updateUserPassword
    , updateProfilePicture as updateUserProfilePicture,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from "../../services";
import toast from "react-hot-toast";

export const useUser = () => {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

    const updateUser = async (data) => {
        setIsLoading(true)
        try {
            const response = await updateUserService(data); 

            if (response?.error) {
                throw response.e;
            }

            console.log(response);

            const localUser = JSON.parse(localStorage.getItem("user"));

            if (response?.data?.user) {
                localUser.name = response.data.user.name;
                localUser.email = response.data.user.email;
                localStorage.setItem('user', JSON.stringify(localUser));
                window.location.reload();
            }

            toast.success(response?.data?.msg || "Usuario actualizado correctamente");
            setIsLoading(false);
        } catch (e) {
            toast.error("Error al actualizar el usuario: " + (e?.response?.data?.msg || e?.response?.data?.message || e?.message || "Error desconocido"));
            setIsLoading(false);
        }
    }

    const updateProfilePicture = async (file) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('img', file);

            const response = await updateUserProfilePicture(formData);

            if (response?.error) {
                throw response.e;
            }

            const newImgUrl = response?.data?.img;
            
            const localUser = JSON.parse(localStorage.getItem("user"));

            console.log(localUser);

            if (newImgUrl) {
                localUser.img = newImgUrl;
                localStorage.setItem('user', JSON.stringify(localUser));
                window.location.reload();
            }


            toast.success(response?.data?.msg || "Imagen de perfil actualizada");
            setIsLoading(false);
        } catch (e) {
            toast.error("Error al actualizar la imagen de perfil: " + (e?.response?.data?.msg || e?.response?.data?.message || e?.message || "Error desconocido"));
            setIsLoading(false);
        }
    }

    const deleteUser = async () => {
        setIsLoading(true)
        try {
            const response = await deleteUserService();

            if (response?.error) {
                throw response.e;
            }

            localStorage.setItem('user', JSON.stringify(""));

            toast.success(response?.data?.msg || "Usuario eliminado correctamente");
            setIsLoading(false);
            navigate("7")
        } catch (e) {
            toast.error("Error al eliminar el usuario: " + (e?.response?.data?.msg || e?.response?.data?.message || e?.message || "Error desconocido"));
            setIsLoading(false);
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
        updatePassword,
        updateProfilePicture,
        updateUser,
        deleteUser
    };
}
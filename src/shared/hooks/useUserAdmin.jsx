import { useState } from "react";
import toast from "react-hot-toast";

import {
    getClients as Clients,
    updateUserAdmin,
    deleteUserAdmin,
    createUser,
    getUserById as userId
} from "../../services";

export const useUserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null)

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const data = await Clients();
            setUsers(data.data.users);
        } catch (err) {
            toast.error("Error al cargar usuarios: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (uid, user) => {
        setIsLoading(true);
        try {
            await updateUserAdmin(uid, user); 
            toast.success("Usuario actualizado correctamente");
            loadUsers(); 
            return true;
        } catch (err) {
            toast.error("Error al actualizar usuario: " + err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (uid) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");

        if (!confirm) return;
        setIsLoading(true);
        try {
            await deleteUserAdmin(uid);
            toast.success("Usuario eliminado correctamente");
            loadUsers();
        } catch (err) {
            toast.error("Error al eliminar usuario: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (user) => {
        setIsLoading(true);
        try {
            await createUser(user);
            toast.success("Usuario creado correctamente");
            loadUsers();
        } catch (err) {
            toast.error("Error al crear usuario: " + err.message);
        } finally {
            setIsLoading(false);
        }
    }
    
    const getUserById = async (id) => {
        setIsLoading(true);
        try {
            const data = await userId(id);
            setUser(data.data.user);
        } catch (err) {
            toast.error("Error al crear usuario: " + err.message);
        } finally {
            setIsLoading(false);
        } 
    }

    return {
        users,
        isLoading,
        handleSave,
        handleDelete,
        handleCreate,
        getUserById,
        user,
        loadUsers
    };
}
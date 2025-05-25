import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getClients as fetchClients,
  updateUserAdmin,
  deleteUserAdmin,
  createUser,
  getUserById as fetchUserById
} from "../../services";

export const useUserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClients();
      setUsers(data?.data?.users || []);
    } catch (err) {
      toast.error("Error al cargar usuarios: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (uid, userData) => {
    setIsLoading(true);
    try {
      await updateUserAdmin(uid, userData);
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

  const handleCreate = async (userData) => {
    setIsLoading(true);
    try {
      await createUser(userData);
      toast.success("Usuario creado correctamente");
      loadUsers();
    } catch (err) {
      toast.error("Error al crear usuario: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserById = async (id) => {
    setIsLoading(true);
    try {
      const data = await fetchUserById(id);
      setUser(data?.data?.user || null);
    } catch (err) {
      toast.error("Error al obtener usuario: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    user,
    isLoading,
    loadUsers,
    handleSave,
    handleDelete,
    handleCreate,
    getUserById,
  };
};
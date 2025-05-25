import React, { useEffect } from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import { UserTable } from "../../components/user/UserTable.jsx";
import { useUser, useUserAdmin, useUserHost } from '../../shared/hooks';

export const UserPage = () => {
  const { role } = useUser();
  const { users, loadUsers } = useUserAdmin();
  const { clients, loadClients } = useUserHost();

  useEffect(() => {
    if (role === "ADMIN_ROLE") {
      loadUsers();
    } else if (role === "HOST_ROLE") {
      loadClients();
    }
  }, [role]);

  return (
    <div>
      <ResponsiveAppBar role={role} />
      {role === "ADMIN_ROLE" ? (
        <UserTable users={users} isHost={false} />
      ) : role === "HOST_ROLE" ? (
        <UserTable users={clients} isHost={true} />
      ) : null}
    </div>
  );
};

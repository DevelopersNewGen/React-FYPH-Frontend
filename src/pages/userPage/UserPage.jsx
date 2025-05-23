import React from 'react';
import {ResponsiveAppBar} from '../../components/Navbar.jsx';
import {UserTable} from "../../components/user/UserTable.jsx"

import { useUser, useUserAdmin } from '../../shared/hooks';


export const UserPage = () => {
  const {role} = useUser()
  const {users} = useUserAdmin()

  return (
    <div>
      <div>
        <ResponsiveAppBar role={role}/>
        { 
            role === "ADMIN_ROLE" ? (
                <div>
                    <UserTable users={users}/>
                </div>
            ) : role === "HOST_ROLE" ? (
                <div>
                    HOST
                </div>
            ) : null

        }
      </div>
    </div>
  );
}
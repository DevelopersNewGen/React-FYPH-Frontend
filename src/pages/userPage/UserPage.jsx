import React from 'react';
import {ResponsiveAppBar} from '../../components/Navbar.jsx';
import {UserTable} from "../../components/user/UserTable.jsx"

import { useUser } from '../../shared/hooks/useUser.jsx';


export const UserPage = () => {
  const {role} = useUser()

  return (
    <div>
      <div>
        <ResponsiveAppBar role={role}/>
        { 
            role === "ADMIN_ROLE" ? (
                <div>
                    <UserTable/>
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
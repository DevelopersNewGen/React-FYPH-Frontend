import React from 'react';
import {ResponsiveAppBar} from '../../components/Navbar.jsx';

const role = "HOST_ROLE"

export const UserPage = () => {
  return (
    <div>
      <div>
        <ResponsiveAppBar />
        { 
            role === "ADMIN_ROLE" ? (
                <div>
                    ADMIN
                </div>
            ) : role === "USER_ROLE" ? (
                <div>
                    USER
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
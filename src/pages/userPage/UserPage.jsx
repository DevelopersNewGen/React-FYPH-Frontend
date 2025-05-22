import React from 'react';
import {ResponsiveAppBar} from '../../components/Navbar.jsx';

const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role || null;

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
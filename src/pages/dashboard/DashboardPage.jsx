import React from 'react';
import {ResponsiveAppBar} from '../../components/Navbar.jsx';
import { useUser } from '../../shared/hooks';

export const DashboardPage = () => {
    const {role} = useUser();

  return (
    <div>
      <div>
        <ResponsiveAppBar role={role}/>
      </div>
    </>
  );
};
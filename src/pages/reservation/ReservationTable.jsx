import React, { useEffect } from 'react';
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import { ReservationTable } from '../../components/reservation/ReservationTable.jsx';
import { useUser } from '../../shared/hooks/useUser.jsx';

export default function ReservationTablePage () {
  const { role } = useUser();

  useEffect(() => {
    if (role !== 'HOST_ROLE') {
     
    }
  }, [role]);

  return (
    <div>
      <ResponsiveAppBar role={role} />
      {role === 'HOST_ROLE' ? (
        <ReservationTable />
      ) : (
        <p style={{ padding: '1rem' }}>Acceso no autorizado.</p>
      )}
    </div>
  );
};

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReservationsByHost } from '../../shared/hooks/useReservationsByHost.jsx';

const columns = (handleViewClick) => [
  { field: 'rid', headerName: 'Reservation ID', width: 220 },
  { field: 'roomNumber', headerName: 'Room #', width: 100 },
  { field: 'userName', headerName: 'Guest Name', width: 150 },
  { field: 'userEmail', headerName: 'Guest Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'startDate', headerName: 'Start Date', width: 130 },
  { field: 'exitDate', headerName: 'Exit Date', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => handleViewClick(params.row.rid)}
      >
        Ver
      </Button>
    )
  }
];

export const ReservationTable = () => {
  const navigate = useNavigate();
  const { reservations, isLoading, error } = useReservationsByHost();

  const handleViewClick = (rid) => {
    navigate(`/reservationDetails/${rid}`);
  };

  if (isLoading) return <p>Cargando reservas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rows = reservations.map(r => ({
    rid: r.rid,
    roomNumber: r.room.number,
    userName: r.user.name,
    userEmail: r.user.email,
    status: r.status ? 'Active' : 'Cancelled',
    startDate: new Date(r.startDate).toLocaleDateString(),
    exitDate: new Date(r.exitDate).toLocaleDateString()
  }));

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns(handleViewClick)}
        getRowId={(row) => row.rid}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
};
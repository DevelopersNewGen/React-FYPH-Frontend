
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = (handleButtonClick) => [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90 
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleButtonClick(params.row.id)}
            >
                Editar
            </Button>
        ),
    },
];


export const UserTable = ({users}) => {
    const navigate = useNavigate(); // Mueve useNavigate dentro del componente funcional

    const handleButtonClick = (id) => {
        console.log("ID enviado:", id);
        navigate(`/userDetailsAdmin/${id}`); // Usa navigate aquí
    };

    const rows = users.map(user => ({
        id: user.uid,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns(handleButtonClick)}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 5,
                },
            },
            }}
            pageSizeOptions={[5]}
        />
        </Box>
    );
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/hotel-module
=======
}
>>>>>>> origin/room-module

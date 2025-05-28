import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = (handleButtonClick, isHost) => {
    const baseColumns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Nombre', width: 150 },
        { field: 'email', headerName: 'Correo', width: 200 },
        { field: 'role', headerName: 'Rol', width: 150 },
        { field: 'status', headerName: 'Estado', width: 120 },
    ];

    if (!isHost) {
        baseColumns.push({
            field: 'actions',
            headerName: 'Acciones',
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
        });
    }

    return baseColumns;
};

export const UserTable = ({ users, isHost }) => {
    const navigate = useNavigate();

    const handleButtonClick = (id) => {
        navigate(`/userDetails/${id}`);
    };

    const rows = users.map(user => ({
        id: user.uid || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
    }));

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: 'rgba(25, 118, 210, 0.05)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgb(25, 118, 210)',
                borderRadius: 3,
                p: 2,
                color: 'white',
                overflow: 'hidden',
                marginTop: '20px',
            }}
        >
            <Box
                sx={{
                    height: 450,
                    width: '100%',
                    '& .MuiDataGrid-root': {
                        backgroundColor: 'transparent',
                        color: 'white',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                    },
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns(handleButtonClick, isHost)}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 }, // Cambié de 5 a 10
                        },
                    }}
                    pageSizeOptions={[5, 10]} // Permite elegir entre 5 y 10 filas por página
                />
            </Box>
        </Paper>
    );
};

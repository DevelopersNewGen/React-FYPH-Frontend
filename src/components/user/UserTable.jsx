import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Función para definir las columnas de la tabla
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
                    sx={{
                        backgroundColor: '#1a73e8',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#155ab2',
                        },
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        textTransform: 'none',
                    }}
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

// Componente principal
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
            elevation={5}
            sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: 4,
                p: 2,
                overflow: 'hidden',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                marginTop: 10,
            }}
        >
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .MuiDataGrid-root': {
                        backgroundColor: '#ffffff',
                        color: '#333',
                        borderRadius: '8px',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#1a73e8',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: 'black !important', // Forzamos el color blanco para mejor visibilidad
                        fontWeight: 'bold',
                        fontSize: '14px',
                    },

                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        fontSize: '14px',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#f5f5f5',
                    },
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns(handleButtonClick, isHost)}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>
        </Paper>
    );
};

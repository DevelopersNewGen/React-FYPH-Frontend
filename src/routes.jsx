import { DashboardPage } from './pages/dashboard/DashboardPage';
import { RoomPage } from './pages/room/RoomPage';
import RoomDetails from './pages/room/RoomDetails'; 
import RoomAddPage from './pages/room/RoomAdd'; 

export const routes = [
    { path: '/*', element: <DashboardPage /> },
    { path: '/habitaciones', element: <RoomPage /> },
    { path: '/habitaciones/detalles/:rid', element: <RoomDetails /> },
    { path: '/habitaciones/agregar', element: <RoomAddPage /> }
];
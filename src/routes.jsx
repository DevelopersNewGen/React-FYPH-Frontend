import { DashboardPage } from './pages/dashboard/DashboardPage';
import { RoomPage } from './pages/room/RoomPage';
import RoomDetails from './pages/room/RoomDetails'; 

export const routes = [
    { path: '/*', element: <DashboardPage /> },
    { path: '/habitaciones', element: <RoomPage /> },
    { path: '/habitaciones/detalles', element: <RoomDetails /> } 
];
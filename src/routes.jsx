import { element } from 'prop-types';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { RoomPage } from './pages/room/RoomPage';

export const routes = [
    {path: '/*', element: <DashboardPage/>},
    {path: '/habitaciones', element: <RoomPage/> }
]

import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UserPage } from './pages/userPage/UserPage';
import { AuthPage } from './pages/authPage/AuthPage';
import Event from "./pages/event/Event";
import EventDetail from "./pages/event/EventDetail";
import CreateEventPage from "./pages/event/CreateEventPage";


export const routes = [
    {path: '/*', element: <DashboardPage/>},
    {path: "/user", element: <UserPage/>},
    {path: "/auth", element: <AuthPage/>},
    { path: "/eventos", element: <Event /> },
    { path: "/eventos/:eid", element: <EventDetail />},
    { path: "/eventos/nuevo", element: <CreateEventPage />}
]

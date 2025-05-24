import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UserPage } from './pages/userPage/UserPage';
import { AuthPage } from './pages/authPage/AuthPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { PopularHotelsPage } from './pages/reportPage/PopularHotelsPage';

export const routes = [
    {path: '/*', element: <DashboardPage/>},
    {path: "/user", element: <UserPage/>},
    {path: "/auth", element: <AuthPage/>},
    {path: "/profile", element: <ProfilePage/>},
    {path: "/report", element: <PopularHotelsPage/>},
]
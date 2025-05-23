import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UserPage } from './pages/userPage/UserPage';
import { AuthPage } from './pages/authPage/AuthPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { HotelPage } from "./pages/hotelPage/hotelPage.jsx";
import { HotelDetailsPage } from "./pages/hotelPage/HotelDetailsPage.jsx";
import { HotelAddPage } from "./pages/hotelPage/HotelAddPage.jsx";

export const routes = [
  { path: "/*", element: <DashboardPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/hotels", element: <HotelPage /> },
  { path: "/hotels/detalles/:hid", element: <HotelDetailsPage /> },
  {path: "/profile", element: <ProfilePage/>},
  { path: "/hotels/add", element: <HotelAddPage /> }
];
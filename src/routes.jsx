import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UserPage } from './pages/userPage/UserPage';
import { UserDetailPage } from './pages/userPage/UserDetailPage';
import { AuthPage } from './pages/authPage/AuthPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { RoomPage } from './pages/room/RoomPage';
import RoomDetails from './pages/room/RoomDetails'; 
import RoomAddPage from './pages/room/RoomAdd'; 
import { HotelPage } from "./pages/hotelPage/hotelPage.jsx";
import { HotelDetailsPage } from "./pages/hotelPage/HotelDetailsPage.jsx";
import { HotelAddPage } from "./pages/hotelPage/HotelAddPage.jsx";
import RoomCardByHotel from "./pages/room/RoomCardByHotel";

export const routes = [
  { path: "/*", element: <DashboardPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/userDetails/:uid", element: <UserDetailPage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/hotels", element: <HotelPage /> },
  { path: "/hotels/detalles/:hid", element: <HotelDetailsPage /> },
  { path: "/hotels/add", element: <HotelAddPage /> },
  { path: "/hoteles/:hid/habitaciones", element: <RoomCardByHotel /> },
  { path: "/habitaciones", element: <RoomPage /> },
  { path: "/habitaciones/detalles/:rid", element: <RoomDetails /> },
  { path: "/habitaciones/agregar", element: <RoomAddPage /> }
];
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UserPage } from './pages/userPage/UserPage';
import { AuthPage } from './pages/authPage/AuthPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { RoomPage } from './pages/room/RoomPage';
import RoomDetails from './pages/room/RoomDetails'; 
import RoomAddPage from './pages/room/RoomAdd'; 
import { HotelPage } from "./pages/hotelPage/hotelPage.jsx";
import { HotelDetailsPage } from "./pages/hotelPage/HotelDetailsPage.jsx";
import { HotelAddPage } from "./pages/hotelPage/HotelAddPage.jsx";
import RoomCardByHotel from "./pages/room/RoomCardByHotel";
import ReserAddPage from "./pages/reservation/ReservationAdd"
import ReservationCardByRoom from "./pages/reservation/ReservationCardByRoom.jsx"
import ReservationCardByHotel from "./pages/reservation/ReservationCardByHotel.jsx"

export const routes = [
  { path: "/*", element: <DashboardPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/hotels", element: <HotelPage /> },
  { path: "/hotels/detalles/:hid", element: <HotelDetailsPage /> },
  {path: "/profile", element: <ProfilePage/>},
  { path: "/hotels/add", element: <HotelAddPage /> },
  { path: '/habitaciones', element: <RoomPage /> },
  { path: '/habitaciones/detalles/:rid', element: <RoomDetails /> },
  { path: '/habitaciones/agregar', element: <RoomAddPage /> },
  { path: "/hoteles/:hid/habitaciones", element: <RoomCardByHotel /> },
  {path: "/reservas/agregar/:rid", element: <ReserAddPage />},
  { path: "/reservacion/:rid", element: <ReserAddPage />},
  { path: "/reservaciones/habitacion/:rid", element:<ReservationCardByRoom />},
  { path: "/reservaciones/hotel/:hid", element:<ReservationCardByHotel/>}
];



import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UserPage } from './pages/userPage/UserPage';
import { AuthPage } from './pages/authPage/AuthPage';
import { ProfilePage } from './pages/profile/ProfilePage';
<<<<<<< HEAD
<<<<<<< HEAD
import Event from "./pages/event/Event";
import EventDetail from "./pages/event/EventDetail";
import CreateEventPage from "./pages/event/CreateEventPage";

=======
import { RoomPage } from './pages/room/RoomPage';
import RoomDetails from './pages/room/RoomDetails'; 
import RoomAddPage from './pages/room/RoomAdd'; 
>>>>>>> origin/room-module

export const routes = [
    {path: '/*', element: <DashboardPage/>},
    {path: "/user", element: <UserPage/>},
    {path: "/auth", element: <AuthPage/>},
<<<<<<< HEAD
     {path: "/profile", element: <ProfilePage/>},
    { path: "/eventos", element: <Event /> },
    { path: "/eventos/:eid", element: <EventDetail />},
    { path: "/eventos/nuevo", element: <CreateEventPage />}
]
=======
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
>>>>>>> origin/hotel-module
=======
    {path: "/profile", element: <ProfilePage/>},
    { path: '/habitaciones', element: <RoomPage /> },
    { path: '/habitaciones/detalles/:rid', element: <RoomDetails /> },
    { path: '/habitaciones/agregar', element: <RoomAddPage /> },
]
>>>>>>> origin/room-module

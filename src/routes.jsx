import { DashboardPage } from './pages/dashboard/DashboardPage';
import { HotelPage  } from "./pages/hotelPage/hotelPage.jsx";
import { HotelDetailsPage } from "./pages/hotelPage/HotelDetailsPage.jsx";

export const routes = [
  { path: "/*", element: <DashboardPage /> },
  { path: "/hotels", element: <HotelPage /> },
  { path: "/hotels/detalles/:hid", element: <HotelDetailsPage />}
]
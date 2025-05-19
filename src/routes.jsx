import { DashboardPage } from './pages/dashboard/DashboardPage';
import { HotelPage } from "./pages/hotelPage/hotelPage"

export const routes = [
  { path: "/*", element: <DashboardPage /> },
  { path: "/hotels", element: <HotelPage /> },
]
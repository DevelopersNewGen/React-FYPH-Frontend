import { DashboardPage } from "./pages/dashboard/DashboardPage";
import Event from "./pages/event/Event";

export const routes = [
  { path: "/eventos", element: <Event /> },
  { path: "/*", element: <DashboardPage /> },
];

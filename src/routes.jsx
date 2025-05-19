import { DashboardPage } from "./pages/dashboard/DashboardPage";
import Event from "./pages/event/Event";
import EventDetail from "./pages/event/EventDetail";

export const routes = [
  { path: "/eventos", element: <Event /> },
  { path: "/*", element: <DashboardPage /> },
  { path: "/eventos/:eid", element: <EventDetail />}
];

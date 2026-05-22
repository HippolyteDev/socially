import { createBrowserRouter } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProtectedLayout } from "../layouts/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      // Tout mes autres pages //
    ],
  },
]);

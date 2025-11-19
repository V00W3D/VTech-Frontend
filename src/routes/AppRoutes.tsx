// src/routes/AppRoutes.tsx
import { useRoutes } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { landingRoutes } from "./landingRoutes";
import { adminRoutes } from "./adminRoutes";

export const AppRoutes = () => {
  const routes = [
    ...landingRoutes,
    ...authRoutes,
    ...adminRoutes,
    { path: "*", element: <h1>404 - Página no encontrada</h1> },
  ];

  return useRoutes(routes);
};

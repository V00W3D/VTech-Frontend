// src/routes/landingRoutes.tsx
import { HistorialModal } from "@components/Landing/features/Modals/HistorialModal";
import LandingPage from "@pages/LandingPage";
export const landingRoutes = [
  {
    path: "/",
    element: <LandingPage />,
    children: [{ path: "historial", element: <HistorialModal /> }],
  },
];

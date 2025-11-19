import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "@pages/AdminPage";
import { AcceptModal } from "@components/Admin/features/Modals/Requests/AcceptModal";
import { RejectModal } from "@components/Admin/features/Modals/Requests/RejectModal";
import { FinishModal } from "@components/Admin/features/Modals/Requests/FinishModal";
import { AdminRequestsContainer } from "@components/Admin/AdminRequestsContainer";
import { AdminUsersContainer } from "@components/Admin/AdminUsersContainer";
import { EditarModalU } from "@components/Admin/features/Modals/Users/EditarModalU";
import { CrearModalU } from "@components/Admin/features/Modals/Users/CrearModalU";
import { BanearModal } from "@components/Admin/features/Modals/Users/BanearModal";
import { AdminServicesContainer } from "@components/Admin/AdminServicesContainer";
import { EditarModalS } from "@components/Admin/features/Modals/Services/EditarModalS";
import { CrearModalS } from "@components/Admin/features/Modals/Services/CrearModalS";
import { BloquearModal } from "@components/Admin/features/Modals/Services/BloquearModal";
export const adminRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin/*",
        element: <AdminPage />, // solo esto, el layout está dentro
        children: [
          // Secciones principales
          { index: true, element: <AdminRequestsContainer /> },
          { path: "solicitudes", element: <AdminRequestsContainer /> },
          { path: "usuarios", element: <AdminUsersContainer /> },
          { path: "servicios", element: <AdminServicesContainer /> },

          // Modales
          // Solicitudes
          { path: "solicitudes/aceptar/:id", element: <AcceptModal /> },
          { path: "solicitudes/rechazar/:id", element: <RejectModal /> },
          { path: "solicitudes/finalizar/:id", element: <FinishModal /> },

          // Usuarios
          { path: "usuarios/editar/:id", element: <EditarModalU /> },
          { path: "usuarios/banear/:id", element: <BanearModal /> },
          { path: "usuarios/crear", element: <CrearModalU /> },

          //Servicios
          { path: "servicios/editar/:id", element: <EditarModalS /> },
          { path: "servicios/bloquear/:id", element: <BloquearModal /> },
          { path: "servicios/crear", element: <CrearModalS /> },
        ],
      },
    ],
  },
];

import { Outlet } from "react-router-dom";
import AdminHeader from "@components/Admin/AdminHeader";
import AdminSectionsNavbar from "@components/Admin/features/AdminHeader/AdminSectionsNavBar";
import "@CSS/AdminLayout/AdminHeader.css";
import "@CSS/AdminLayout/AdminSectionsNavBar.css";
import "@CSS/AdminLayout/AdminRequests.css";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <AdminSectionsNavbar />
      <Outlet /> {/* Renderiza la sección o modal activa */}
    </>
  );
};

export default AdminLayout;

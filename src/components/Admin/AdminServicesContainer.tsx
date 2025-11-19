import { useEffect } from "react";
import { ServicesTable } from "./features/Tables/AdminServicesTable";
import { useAdmin } from "@hooks/private";
import { useNavigate } from "react-router-dom";
export const AdminServicesContainer = () => {
  document.title = "Admin - Gestionando Servicios";
  const navigate = useNavigate();

  const { fetchServices } = useAdmin.Services.useFetchServices();
  useEffect(() => {
    fetchServices(); // cargar al inicio
  }, []);

  return (
    <div className="admin-requests-container full-width">
      <h1>Gestionando Servicios</h1>
      <button
        type="button"
        className="accion-btn aceptar"
        onClick={() => {
          navigate("/admin/servicios/crear");
        }}
      >
        + Crear Servicio
      </button>
      <ServicesTable />
    </div>
  );
};

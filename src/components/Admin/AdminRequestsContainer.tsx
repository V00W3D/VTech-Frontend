import { useEffect } from "react";
import { useAdmin } from "@hooks/private";
import { RequestsTable } from "./features/Tables/AdminRequestsTable";

export const AdminRequestsContainer = () => {
  document.title = "Admin - Gestionando Solicitudes";
  const { solicitudes, isLoading, isError, fetchSolicitudes } =
    useAdmin.Requests.useFetchSolicitudes();

  useEffect(() => {
    fetchSolicitudes(true);
  }, []);

  if (isLoading)
    return <p className="text-center mt-4">Cargando solicitudes...</p>;

  if (isError)
    return (
      <p className="text-center mt-4 text-danger">
        Error al obtener solicitudes
      </p>
    );

  if (!solicitudes.length)
    return (
      <p className="text-center mt-4 text-muted">
        No hay solicitudes registradas
      </p>
    );
  return (
    <div className="admin-requests-container full-width">
      <h1>Gestionando Solicitudes</h1>
      <RequestsTable />
    </div>
  );
};

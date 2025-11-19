import { TableBuilder } from "@common/TableBuilder";
import {
  getServiceTableColumns,
  useServicesTableOptions,
} from "@utils/ServicesTableUtils";
import { useAdmin } from "@hooks/private";
import "@CSS/ServiceTable.css";
import { useAdminStore } from "@store/useAdminStore";

export const ServicesTable = () => {
  // Hook centralizado del admin para servicios
  const { useFetchServices } = useAdmin.Services;
  const { fetchServices, isLoading, isError } = useFetchServices();
  const { servicios } = useAdminStore();
  const { handleOpenModal } = useServicesTableOptions();

  // 🌀 Estados de carga o error
  if (isLoading) return <p className="text-muted">Cargando servicios...</p>;
  if (isError) return <p className="text-danger">Error al cargar servicios.</p>;
  if (!servicios?.length)
    return <p className="text-muted">No hay servicios registrados.</p>;

  return (
    <div className="service-table-container">
      <TableBuilder
        columns={getServiceTableColumns() as any}
        data={servicios}
        renderActions={(row) => (
          <div className="service-acciones-container">
            <button
              className="accion-btn finalizar"
              onClick={() =>
                handleOpenModal("editar", row.id, () => fetchServices(true))
              }
            >
              Editar
            </button>
            <button
              className={`accion-btn ${row.deleted ? "aceptar" : "rechazar"}`}
              onClick={() =>
                handleOpenModal("bloquear", row.id, () => fetchServices(true))
              }
            >
              {row.deleted ? "Desbloquear" : "Bloquear"}
            </button>
          </div>
        )}
      />
    </div>
  );
};

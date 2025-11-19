// src/components/Admin/RequestsTable.tsx
import { TableBuilder } from "@common/TableBuilder";
import {
  getServiceTableColumns,
  useRequestsTableOptions,
} from "@utils/RequestsTableUtils";
import { useAdmin } from "@hooks/private";
import "@CSS/ServiceTable.css";

export const RequestsTable = () => {
  // Hook centralizado de solicitudes del admin
  const { useFetchSolicitudes } = useAdmin.Requests;
  const { solicitudes, fetchSolicitudes, isLoading, isError } =
    useFetchSolicitudes();

  const { handleOpenModal } = useRequestsTableOptions();

  // 🌀 Estados de carga o error
  if (isLoading) return <p className="text-muted">Cargando solicitudes...</p>;
  if (isError)
    return <p className="text-danger">Error al cargar solicitudes.</p>;
  if (!solicitudes?.length)
    return <p className="text-muted">No hay solicitudes registradas.</p>;

  return (
    <div className="service-table-container">
      <TableBuilder
        columns={getServiceTableColumns() as any}
        data={solicitudes}
        renderActions={(row) => (
          <div className="acciones-container">
            {row.estado === "pendiente" && (
              <>
                <button
                  className="accion-btn aceptar"
                  onClick={() =>
                    handleOpenModal("aceptar", row.id, () =>
                      fetchSolicitudes(true)
                    )
                  } // ✅ fuerza recarga al volver
                >
                  Aceptar
                </button>
                <button
                  className="accion-btn rechazar"
                  onClick={() =>
                    handleOpenModal("rechazar", row.id, () =>
                      fetchSolicitudes(true)
                    )
                  }
                >
                  Rechazar
                </button>
              </>
            )}
            {row.estado === "aceptada" && (
              <button
                className="accion-btn finalizar"
                onClick={() =>
                  handleOpenModal("finalizar", row.id, () =>
                    fetchSolicitudes(true)
                  )
                }
              >
                Finalizar
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};

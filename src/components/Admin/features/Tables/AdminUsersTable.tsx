// src/components/Admin/UserTable.tsx
import { TableBuilder } from "@common/TableBuilder";
import {
  getUserTableColumns,
  useUserTableActions,
} from "@utils/UsersTableUtils";
import { useAdmin } from "@hooks/private"; // 🔥 nuevo import
import "@CSS/UserTable.css";

export const UserTable = () => {
  // Hook centralizado que maneja fetching y store global
  const { useFetchUsuarios } = useAdmin.Users;
  const { usuarios, fetchUsuarios, isLoading, isError } = useFetchUsuarios();
  const { handleOpenModal } = useUserTableActions();

  // Estados de carga o error
  if (isLoading) return <p className="text-muted">Cargando usuarios...</p>;
  if (isError) return <p className="text-danger">Error al cargar usuarios.</p>;
  if (!usuarios?.length)
    return <p className="text-muted">No hay usuarios registrados.</p>;
  return (
    <div className="user-table-container">
      <TableBuilder
        columns={getUserTableColumns() as any}
        data={usuarios}
        renderActions={(row) => (
          <div className="user-acciones-container">
            {!row.eliminado && (
              <button
                className="user-accion-btn editar"
                onClick={() =>
                  handleOpenModal("editar", row.id, () => fetchUsuarios(true))
                } // ✅ fuerza recarga
              >
                Editar
              </button>
            )}
            <button
              className="user-accion-btn banear"
              onClick={() =>
                handleOpenModal("banear", row.id, () => fetchUsuarios(true))
              } // ✅ idem
            >
              {row.eliminado ? "Desbanear" : "Banear"}
            </button>
          </div>
        )}
      />
    </div>
  );
};

import { TableBuilder } from "@common/TableBuilder";
import { getHistorialColumns } from "@utils/HistorialTableUtils";

export interface HistorialItem {
  id: string;
  estado: string;
  descripcion?: string;
  [key: string]: any;
}

interface HistorialTableProps {
  historial: HistorialItem[];
  isLoading: boolean;
  isError: boolean;
  fetchHistorial: (force?: boolean) => Promise<void>;
}

export const HistorialTable = ({
  historial,
  isLoading,
  isError,
}: HistorialTableProps) => {
  if (isLoading) return <p className="text-muted">Cargando historial...</p>;
  if (isError) return <p className="text-danger">Error al cargar historial.</p>;
  if (!historial?.length)
    return <p className="text-muted">No hay solicitudes en el historial.</p>;

  return (
    <TableBuilder
      columns={getHistorialColumns() as any}
      data={historial}
      renderActions={undefined}
    />
  );
};

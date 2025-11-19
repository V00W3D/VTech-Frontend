// src/utils/HistorialTableUtils.tsx
import type { RequestType } from "@services/private";
import type { TableColumn } from "@common/TableBuilder/Types";

/* 🎨 Badge de estado */
const getEstadoBadge = (estado: string) => {
  const colorMap: Record<string, string> = {
    pendiente: "#e8c547",
    aceptada: "#5cc95c",
    rechazada: "#d94b4b",
    cancelada: "#777",
    finalizada: "#4b8fd9",
  };

  return (
    <span
      className="estado-badge"
      style={{ backgroundColor: colorMap[estado] || "#999" }}
    >
      {estado?.toUpperCase() || "—"}
    </span>
  );
};

/* 🧱 Generador de columnas tipado y con return explícito */
export const getHistorialColumns = (): TableColumn<RequestType.Solicitud>[] => {
  return [
    {
      key: "estado",
      label: "Estado",
      render: (value: string) => getEstadoBadge(value),
    },
    {
      key: "servicio",
      label: "Servicio",
      render: (_: unknown, row: RequestType.Solicitud) => {
        const nombre =
          typeof row.servicio === "string"
            ? row.servicio
            : row.servicio?.nombre ?? "Servicio no especificado";

        return (
          <p className="servicio-text">
            {nombre} <span className="servicio-tipo">de/para</span> {row.target}
          </p>
        );
      },
    },
    {
      key: "fecha",
      label: "Fecha",
      render: (value: string) => (
        <p className="fecha-text">{new Date(value).toLocaleString("es-AR")}</p>
      ),
    },
    {
      key: "descripcion",
      label: "Descripción",
      render: (_: unknown, row: RequestType.Solicitud) => (
        <p className="description-text">{row.descripcion || "—"}</p>
      ),
    },
  ];
};

// src/utils/RequestsTableUtils.ts
import type { RequestType } from "@services/private";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

/* ✅ Formatea un número de teléfono */
export const formatTelefono = (telefono: string): string => {
  if (!telefono) return "—";
  const cleaned = telefono.replace(/\D/g, "");
  if (cleaned.length < 10) return `+${cleaned}`;
  const pais = cleaned.slice(0, 2);
  const extra = cleaned.slice(2, 3);
  const area = cleaned.slice(3, 5);
  const parte1 = cleaned.slice(5, 9);
  const parte2 = cleaned.slice(9);
  return `+${pais} ${extra} ${area} ${parte1}-${parte2}`;
};

/* 🟢 Devuelve el badge de estado con color */
const getEstadoBadge = (estado: string) => {
  const colorMap: Record<string, string> = {
    pendiente: "#e8c547",
    aceptada: "#5cc95c",
    rechazada: "#d94b4b",
    finalizada: "#4b8fd9",
  };
  const bgColor = colorMap[estado] || "#999";
  return (
    <span className="estado-badge" style={{ backgroundColor: bgColor }}>
      {estado.toUpperCase()}
    </span>
  );
};

/* 🧱 Generador de columnas del TableBuilder */
export const getServiceTableColumns = () => [
  {
    key: "estado",
    label: "Estado",
    render: (value: string) => getEstadoBadge(value),
  },
  {
    key: "servicio",
    label: "Servicio",
    render: (_: unknown, row: RequestType.Solicitud) => {
      const servicioText =
        typeof row.servicio === "string"
          ? row.servicio
          : row.servicio?.nombre ?? "Servicio no especificado";
      return (
        <p className="servicio-text">
          {servicioText} <span className="servicio-tipo">de/para</span>{" "}
          {row.target}
        </p>
      );
    },
  },
  {
    key: "usuario",
    label: "Usuario",
    render: (_: unknown, row: RequestType.Solicitud) => (
      <div className="usuario-cell">
        <div className="usuario-avatar">
          {row.usuario?.nombre?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className="usuario-info">
          <p className="usuario-nombre">
            {row.usuario?.nombre || "Desconocido"}
          </p>
          <p className="usuario-telefono">
            {formatTelefono(row.usuario?.telefono || "")}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "fecha",
    label: "Fecha y Hora",
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

/* 🪄 Hook auxiliar para abrir modales de solicitudes */
export const useRequestsTableOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSuccessRef = useRef<(() => void) | null>(null);

  /**
   * Abre un modal de solicitud (aceptar, rechazar o finalizar)
   * y ejecuta `onSuccess` automáticamente al volver a /admin/solicitudes
   */
  const handleOpenModal = (
    tipo: "aceptar" | "rechazar" | "finalizar",
    id: string,
    onSuccess?: () => void
  ) => {
    // Guarda el callback temporalmente
    onSuccessRef.current = onSuccess || null;

    // Navega al modal correspondiente
    navigate(`/admin/solicitudes/${tipo}/${id}`);
  };

  // 🧠 Detecta cuando el usuario regresa a la vista principal
  useEffect(() => {
    if (location.pathname === "/admin/solicitudes" && onSuccessRef.current) {
      console.log("↩️ Volviste de un modal, refrescando solicitudes...");
      onSuccessRef.current();
      onSuccessRef.current = null;
    }
  }, [location.pathname]);

  return { handleOpenModal };
};

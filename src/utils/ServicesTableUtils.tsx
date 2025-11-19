// src/utils/ServicesTableUtils.ts
import type { ServiceType } from "@services/private";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

/* 🎯 Badge visual de estado (activo/inactivo) */
const getEstadoBadge = (activo: boolean) => {
  const bgColor = activo ? "#2e8b57" : "#b22222";
  const texto = activo ? "ACTIVO" : "INACTIVO";
  return (
    <span className="estado-badge" style={{ backgroundColor: bgColor }}>
      {texto}
    </span>
  );
};

/* 🏷️ Renderiza los targets con el NUEVO modelo */
const renderTargets = (targets: ServiceType.Target[]) => {
  if (!targets || targets.length === 0)
    return <span className="tag-badge empty">Sin targets</span>;

  return (
    <div className="targets-table-grid">
      {targets.map((t) => (
        <div key={t.name} className="target-table-card">
          <div className="target-table-icon-wrapper">
            {t.icon ? (
              <img src={t.icon} alt={t.name} className="target-table-icon" />
            ) : (
              <div className="target-table-icon-placeholder" />
            )}
          </div>
          <span className="target-table-name">{t.name}</span>
        </div>
      ))}
    </div>
  );
};

/* 🧱 Generador de columnas del TableBuilder */
export const getServiceTableColumns = () => [
  {
    key: "imagen",
    label: "Servicio",
    render: (_: unknown, row: ServiceType.Servicio) => (
      <div className="service-cell">
        {row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="service-avatar"
            style={{
              width: 350,
              height: 200,
              borderRadius: "10px",
              objectFit: "fill",
            }}
          />
        ) : (
          <div className="service-avatar-placeholder">
            {row.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="description-text">
          <p className="service-nombre">{row.name}</p>
          <p className="service-slogan">{row.slogan || "—"}</p>
        </div>
      </div>
    ),
  },
  {
    key: "shortDescription",
    label: "Descripción Corta",
    render: (value: string) => (
      <p className="description-text" style={{ maxWidth: 500 }}>
        {value || "—"}
      </p>
    ),
  },
  {
    key: "longDescription",
    label: "Descripción Larga",
    render: (value: string) => (
      <p className="description-text">{value || "—"}</p>
    ),
  },
  {
    key: "targets",
    label: "Targets",
    render: (_: unknown, row: ServiceType.Servicio) =>
      renderTargets(row.targets),
  },
  {
    key: "activo",
    label: "Estado",
    render: (value: boolean) => getEstadoBadge(value),
  },
];

/* 🪄 Hook auxiliar para manejar acciones en la tabla */
export const useServicesTableOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSuccessRef = useRef<(() => void) | null>(null);

  const handleOpenModal = (
    tipo: "bloquear" | "editar",
    id: string,
    onSuccess?: () => void
  ) => {
    onSuccessRef.current = onSuccess || null;
    navigate(`/admin/servicios/${tipo}/${id}`);
  };

  useEffect(() => {
    if (location.pathname === "/admin/servicios" && onSuccessRef.current) {
      console.log("↩️ Volviste de un modal, refrescando servicios...");
      onSuccessRef.current();
      onSuccessRef.current = null;
    }
  }, [location.pathname]);

  return { handleOpenModal };
};

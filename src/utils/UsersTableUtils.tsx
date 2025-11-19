// src/utils/UsersTableUtils.ts
import type { UserType } from "@services/private";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

// 🟢 Badges de estado visual
const getEstadoBadge = (eliminado: boolean) => {
  const bgColor = eliminado ? "#b22222" : "#2e8b57";
  const texto = eliminado ? "BANEADO" : "ACTIVO";
  return (
    <span className="user-estado-badge" style={{ backgroundColor: bgColor }}>
      {texto}
    </span>
  );
};

// 🟣 Badge de rol
const getRolBadge = (rol: string) => {
  const isAdmin = rol === "Admin";
  return (
    <span className={`user-rol ${isAdmin ? "admin" : "cliente"}`}>{rol}</span>
  );
};

// 🧱 Generador de columnas
export const getUserTableColumns = () => [
  {
    key: "imagen",
    label: "Usuario",
    render: (_: any, row: UserType.Usuario) => (
      <div className="user-cell">
        {row.imagen ? (
          <img src={row.imagen} alt={row.nombre} className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            {row.nombre.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="user-info">
          <p className="user-nombre">{row.nombre}</p>
          <p className="user-email">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "telefono",
    label: "Teléfono",
    render: (value: string) => <p className="user-telefono">{value || "—"}</p>,
  },
  {
    key: "rol",
    label: "Rol",
    render: (value: string) => getRolBadge(value),
  },
  {
    key: "eliminado",
    label: "Estado",
    render: (value: boolean) => getEstadoBadge(value),
  },
];

// 🪄 Hook auxiliar para las acciones
export const useUserTableActions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSuccessRef = useRef<(() => void) | null>(null);

  /**
   * Abre un modal de usuario (editar, banear o crear)
   * y ejecuta la acción `onSuccess` automáticamente
   * cuando se vuelve a /admin/usuarios
   */
  const handleOpenModal = (
    tipo: "editar" | "banear" | "crear",
    id: string,
    onSuccess?: () => void
  ) => {
    // guardamos el callback temporalmente
    onSuccessRef.current = onSuccess || null;

    // navegamos al modal correspondiente
    navigate(`/admin/usuarios/${tipo}/${id}`);
  };

  // 🧠 Detecta cuando el usuario regresa a la vista principal
  useEffect(() => {
    if (location.pathname === "/admin/usuarios" && onSuccessRef.current) {
      console.log("↩️ Volviste de un modal, refrescando tabla...");
      onSuccessRef.current();
      onSuccessRef.current = null;
    }
  }, [location.pathname]);

  return { handleOpenModal };
};

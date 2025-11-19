import { useState, useEffect } from "react";
import { UserTable } from "./features/Tables/AdminUsersTable";
import { useAdmin } from "@hooks/private";
import { useNavigate } from "react-router-dom";
import { AuthFieldBuilder } from "@common/FormBuilder";
import { useAdminStore } from "@store/useAdminStore";

export const AdminUsersContainer = () => {
  document.title = "Admin - Gestionando Usuarios";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { filtrarUsuarios } = useAdminStore();

  const { isLoading, isError, fetchUsuarios } =
    useAdmin.Users.useFetchUsuarios();

  useEffect(() => {
    fetchUsuarios(); // cargar al inicio
  }, []);

  if (isLoading)
    return <p className="text-center mt-4">Cargando usuarios...</p>;

  if (isError)
    return (
      <p className="text-center mt-4 text-danger">Error al obtener usuarios</p>
    );

  return (
    <div className="admin-requests-container full-width">
      <h1>Gestionando Usuarios</h1>

      <button
        type="button"
        className="accion-btn aceptar"
        onClick={() => navigate("/admin/usuarios/crear")}
      >
        + Crear usuario
      </button>

      {/* 👉 Campo de búsqueda */}
      <AuthFieldBuilder
        id="buscar-usuarios"
        label="Buscar usuarios por nombre"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          filtrarUsuarios(value);
        }}
      />

      <UserTable />
    </div>
  );
};

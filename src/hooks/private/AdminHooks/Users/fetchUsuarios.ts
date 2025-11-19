// src/hooks/private/users/useFetchUsuarios.ts
import { useState, useEffect } from "react";
import { AdminService } from "@services/private";
import { useAdminStore } from "@store/useAdminStore";

export const useFetchUsuarios = () => {
  const { usuarios, setUsuarios, setUsuariosBackup } = useAdminStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchUsuarios = async (force = true) => {
    // Si ya hay usuarios y no se fuerza la recarga → usar cache
    if (usuarios.length > 0 && !force) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const res = await AdminService.Users.fetchUsuarios();
      if (!res.ok) throw new Error(res.error || "Error al obtener usuarios");

      const data = res.data || [];

      // 👉 Guardar backup y versión filtrable
      setUsuariosBackup(data); // version original
      setUsuarios(data); // versión filtrable
    } catch (err) {
      console.error("❌ Error en useFetchUsuarios:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, fetchUsuarios, isLoading, isError };
};

// src/hooks/private/users/useEditarUsuario.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { UserType } from "@services/private";

export const useEditarUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const editarUsuario = async (data: UserType.EditarUsuarioInput) => {
    if (!data) return alert("⚠️ ID inválido.");

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Users.editarUsuario(data);
      if (!res.ok) throw new Error(res.error || "Error al editar usuario");

      setIsSuccess(true);
      alert(res.data?.message || "✏️ Usuario editado correctamente.");
    } catch (err) {
      console.error("❌ Error en useEditarUsuario:", err);
      alert("❌ No se pudo editar el usuario.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editarUsuario, isLoading, isSuccess, isError };
};

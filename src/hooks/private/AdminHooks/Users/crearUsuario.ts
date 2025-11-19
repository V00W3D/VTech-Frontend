// src/hooks/private/users/useCrearUsuario.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { UserType } from "@services/private";

export const useCrearUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const crearUsuario = async (data: UserType.CrearUsuarioInput) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Users.crearUsuario(data);
      if (!res.ok) throw new Error(res.error || "Error al crear usuario");

      setIsSuccess(true);
      alert(res.data?.message || "✅ Usuario creado correctamente.");
    } catch (err) {
      console.error("❌ Error en useCrearUsuario:", err);
      alert("❌ No se pudo crear el usuario.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { crearUsuario, isLoading, isSuccess, isError };
};

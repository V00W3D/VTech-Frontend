// src/hooks/private/users/useBanearUsuario.ts
import { useState } from "react";
import { AdminService } from "@services/private";

export const useBanearUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const banearUsuario = async (id: string) => {
    if (!id) return alert("⚠️ ID inválido.");

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Users.banearUsuario(id);
      if (!res.ok) throw new Error(res.error || "Error al banear usuario");

      setIsSuccess(true);
      alert(
        res.data?.message || "🚫 Usuario baneado/desbaneado correctamente."
      );
    } catch (err) {
      console.error("❌ Error en useBanearUsuario:", err);
      alert("❌ No se pudo banear/desbanear el usuario.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { banearUsuario, isLoading, isSuccess, isError };
};

// src/hooks/public/useCreateRequest.ts
import { useState } from "react";
import { LandingService } from "@services/public";
import type { LandingTypes } from "@services/public/";
import { useAuthStore } from "@store/useAuthStore";

export const useCreateRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user, isLogged } = useAuthStore();

  const createRequest = async (
    params: Omit<LandingTypes.CreateRequestInput, "userId">
  ) => {
    if (!isLogged || !user?.Id) {
      alert("⚠️ Debes iniciar sesión para enviar una solicitud.");
      return;
    }

    const payload: LandingTypes.CreateRequestInput = {
      ...params,
      userId: user.Id,
    };

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      console.log("📨 Enviando solicitud:", payload);
      const res = await LandingService.createRequest(payload);

      if (!res.ok) throw new Error(res.error || "Error desconocido");

      alert("✅ Solicitud enviada correctamente.");
      setIsSuccess(true);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error en useCreateRequest:", err);
      alert("❌ No se pudo enviar la solicitud. Intente nuevamente.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { createRequest, isLoading, isSuccess, isError };
};

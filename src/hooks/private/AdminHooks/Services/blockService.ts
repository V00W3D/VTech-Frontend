// src/hooks/private/services/useBlockService.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { ServiceType } from "@services/private";
import { useFetchServices } from "./fetchServices";

export const useBlockService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchServices } = useFetchServices();

  const blockService = async (id: ServiceType.BlockServiceInput) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Services.blockService(id);
      if (!res.ok) throw new Error(res.error || "Error al bloquear servicio");

      setIsSuccess(true);
      alert(res.data?.message || "✅ Servicio bloqueado correctamente.");
      await fetchServices(true);
    } catch (err) {
      console.error("❌ Error en useBlockService:", err);
      alert("❌ No se pudo bloquear el servicio.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { blockService, isLoading, isSuccess, isError };
};

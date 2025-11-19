// src/hooks/private/services/useCreateService.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { ServiceType } from "@services/private";
import { useFetchServices } from "./fetchServices";

export const useCreateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchServices } = useFetchServices();

  const createService = async (data: ServiceType.CreateServiceInput) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Services.createService(data);
      if (!res.ok) throw new Error(res.error || "Error al crear servicio");

      setIsSuccess(true);
      alert(res.data?.message || "✅ Servicio creado correctamente.");
      await fetchServices(); // refrescar lista
    } catch (err) {
      console.error("❌ Error en useCreateService:", err);
      alert("❌ No se pudo crear el servicio.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { createService, isLoading, isSuccess, isError };
};

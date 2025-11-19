// src/hooks/private/services/useEditService.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { ServiceType } from "@services/private";
import { useFetchServices } from "./fetchServices";

export const useEditService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchServices } = useFetchServices();

  const editService = async (data: ServiceType.EditServiceInput) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Services.editService(data);
      if (!res.ok) throw new Error(res.error || "Error al editar servicio");

      setIsSuccess(true);
      alert(res.data?.message || "✅ Servicio editado correctamente.");
      await fetchServices();
    } catch (err) {
      console.error("❌ Error en useEditService:", err);
      alert("❌ No se pudo editar el servicio.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editService, isLoading, isSuccess, isError };
};

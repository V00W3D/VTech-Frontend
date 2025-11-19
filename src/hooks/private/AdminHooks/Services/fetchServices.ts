// src/hooks/private/services/useFetchServices.ts
import { useState, useEffect } from "react";
import { AdminService } from "@services/private";
import { useAdminStore } from "@store/useAdminStore";

export const useFetchServices = () => {
  const { servicios, setServicios } = useAdminStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchServices = async (force = true) => {
    // Evitar recarga si ya están en cache
    if (servicios.length > 0 && !force) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const res = await AdminService.Services.fetchServices();
      if (!res.ok) throw new Error(res.error || "Error al cargar servicios");

      // Tu backend devuelve { data: [...] }
      setServicios(res.data || []);
    } catch (err) {
      console.error("❌ Error en useFetchServices:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { servicios, fetchServices, isLoading, isError };
};

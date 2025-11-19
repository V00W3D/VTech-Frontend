// src/hooks/private/useFetchSolicitudes.ts
import { useState, useEffect } from "react";
import { AdminService } from "@services/private";
import { useAdminStore } from "@store/useAdminStore";

export const useFetchSolicitudes = () => {
  const { solicitudes, setSolicitudes } = useAdminStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSolicitudes = async (force = true) => {
    // Cache
    if (solicitudes.length > 0 && !force) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const res = await AdminService.Requests.fetchSolicitudes();
      if (!res.ok) throw new Error(res.error || "Error al obtener solicitudes");

      setSolicitudes(res.data || []);
    } catch (err) {
      console.error("❌ Error en useFetchSolicitudes:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  return { solicitudes, fetchSolicitudes, isLoading, isError };
};

// src/hooks/public/useGetAllServices.ts
import { useState, useEffect } from "react";
import { LandingService } from "@services/public";
import type { LandingTypes } from "@services/public";

export const LS_KEY = "landing_services_cache";

export const useGetAllServices = () => {
  const [services, setServices] = useState<LandingTypes.ServiceType[]>([]);
  const [targets, setTargets] = useState<LandingTypes.Target[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const getAllServices = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const cache = localStorage.getItem(LS_KEY);
      if (cache) {
        const parsed = JSON.parse(cache);
        setServices(parsed.services || []);
        setTargets(parsed.targets || []);
        setIsSuccess(true);
        setIsLoading(false);
        return parsed;
      }

      const res = await LandingService.getAllServices();
      if (!res.ok) throw new Error(res.message || "Error al obtener servicios");

      const { serviceTypes, targets } = res.data!;
      setServices(serviceTypes);
      setTargets(targets);
      setIsSuccess(true);

      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ services: serviceTypes, targets })
      );

      return res.data;
    } catch (err: any) {
      console.error("❌ Error en useGetAllServices:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return {
    services,
    targets,
    isLoading,
    isSuccess,
    isError,
    refetch: getAllServices,
  };
};

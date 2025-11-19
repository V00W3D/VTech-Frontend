import { useState, useEffect } from "react";
import { LandingService } from "@services/public";
import { useUserStore } from "@store/useUserStore";
import { useAuthStore } from "@store/useAuthStore";

export const useFetchHistorial = () => {
  const { historial, setHistorial } = useUserStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetch = async (force = true) => {
    console.log("📌 useFetchHistorial → fetch() iniciado | force =", force);

    if (!user?.Id) {
      console.warn("⚠️ No hay user.Id — no se puede pedir historial");
      return;
    }

    console.log("👤 user.Id =", user.Id);

    if (historial.length > 0 && !force) {
      console.log("🟡 Cache encontrada, historial.length =", historial.length);
      return;
    }

    console.log("🔵 Pidiendo historial al backend...");

    setIsLoading(true);
    setIsError(false);

    try {
      const res = await LandingService.fetchHistorial(user.Id);

      console.log("🟢 Respuesta del backend:", res);

      if (!res.ok) {
        console.error("❌ Error recibido del backend:", res.error);
        throw new Error(res.error || "Error desconocido");
      }

      console.log("📥 Datos obtenidos:", res.data);

      setHistorial(res.data || []);
      console.log("📦 Historial guardado en Zustand:", res.data);
    } catch (err) {
      console.error("❌ Error en useFetchHistorial catch:", err);
      setIsError(true);
    } finally {
      console.log("⏹️ fetch() finalizado");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("👀 useEffect disparado (user.Id):", user?.Id);
    fetch();
  }, [user?.Id]);

  return { historial, fetchHistorial: fetch, isLoading, isError };
};

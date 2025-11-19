// src/hooks/private/requests/useRechazarSolicitud.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { RequestType } from "@services/private";

export const useRechazarSolicitud = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const rechazarSolicitud = async (solicitud: RequestType.Solicitud) => {
    if (!solicitud?.id) return alert("⚠️ ID inválido.");

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Requests.rechazarSolicitud(solicitud.id);
      if (!res.ok) throw new Error(res.error || "Error al rechazar solicitud");

      setIsSuccess(true);
      alert(res.message || "❌ Solicitud rechazada.");

      // 🟢 WhatsApp automático
      const mensaje = `[ ✕ ]Hola ${solicitud.usuario.nombre}, lamentamos informarte que tu solicitud del servicio *${solicitud.servicio}* de/para *${solicitud.target}* fue *RECHAZADA*.`;
      const receptor = solicitud.usuario.telefono;
      if (receptor)
        window.open(
          `https://wa.me/${receptor}?text=${encodeURIComponent(mensaje)}`,
          "_blank"
        );

      return res.data;
    } catch (err) {
      console.error("❌ Error en useRechazarSolicitud:", err);
      alert("❌ No se pudo rechazar la solicitud.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { rechazarSolicitud, isLoading, isSuccess, isError };
};

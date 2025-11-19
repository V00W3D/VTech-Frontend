// src/hooks/private/requests/useFinalizarSolicitud.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { RequestType } from "@services/private";

export const useFinalizarSolicitud = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const finalizarSolicitud = async (solicitud: RequestType.Solicitud) => {
    if (!solicitud?.id) return alert("⚠️ ID inválido.");

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Requests.finalizarSolicitud(solicitud.id);
      if (!res.ok) throw new Error(res.error || "Error al finalizar solicitud");

      setIsSuccess(true);
      alert(res.message || "🎉 Solicitud finalizada correctamente.");

      // 🟢 WhatsApp automático
      const mensaje = `Hola ${solicitud.usuario.nombre}, tu solicitud del servicio *${solicitud.servicio}* de/para *${solicitud.target}* ha sido *FINALIZADA*. ¡Gracias por confiar en nosotros!`;
      const receptor = solicitud.usuario.telefono;
      if (receptor)
        window.open(
          `https://wa.me/${receptor}?text=${encodeURIComponent(mensaje)}`,
          "_blank"
        );

      return res.data;
    } catch (err) {
      console.error("❌ Error en useFinalizarSolicitud:", err);
      alert("❌ No se pudo finalizar la solicitud.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { finalizarSolicitud, isLoading, isSuccess, isError };
};

// src/hooks/private/requests/useAceptarSolicitud.ts
import { useState } from "react";
import { AdminService } from "@services/private";
import type { RequestType } from "@services/private";

export const useAceptarSolicitud = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const aceptarSolicitud = async (solicitud: RequestType.Solicitud) => {
    if (!solicitud?.id) return alert("⚠️ ID inválido.");

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await AdminService.Requests.aceptarSolicitud(solicitud.id);
      if (!res.ok) throw new Error(res.error || "Error al aceptar solicitud");

      setIsSuccess(true);
      alert(res.message || "✅ Solicitud aceptada correctamente.");

      // 🟢 WhatsApp automático
      const mensaje = `[ ✓ ]Hola ${solicitud.usuario.nombre}, tu solicitud para el servicio *${solicitud.servicio}*, de/para *${solicitud.target}* fue *ACEPTADA*. Nos comunicaremos pronto contigo.`;
      const receptor = solicitud.usuario.telefono;
      if (receptor)
        window.open(
          `https://wa.me/${receptor}?text=${encodeURIComponent(mensaje)}`,
          "_blank"
        );

      return res.data;
    } catch (err) {
      console.error("❌ Error en useAceptarSolicitud:", err);
      alert("❌ No se pudo aceptar la solicitud.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { aceptarSolicitud, isLoading, isSuccess, isError };
};

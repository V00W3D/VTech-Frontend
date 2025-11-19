import { useAceptarSolicitud } from "./aceptarSolicitud";
import { useFetchSolicitudes } from "./fetchSolicitudes";
import { useFinalizarSolicitud } from "./finalizarSolicitud";
import { useRechazarSolicitud } from "./rechazarSolicitud";

export const Requests = {
  useFetchSolicitudes,
  useAceptarSolicitud,
  useRechazarSolicitud,
  useFinalizarSolicitud,
};

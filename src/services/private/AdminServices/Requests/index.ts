import { aceptarSolicitud } from "./aceptarsolicitud";
import { fetchSolicitudes } from "./fetchsolicitudes";
import { finalizarSolicitud } from "./finalizarsolicitud";
import { rechazarSolicitud } from "./rechazarsolicitud";

export const Requests = {
  fetchSolicitudes,
  aceptarSolicitud,
  rechazarSolicitud,
  finalizarSolicitud,
};

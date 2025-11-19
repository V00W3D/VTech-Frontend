import { cancelarSolicitud } from "./cancelarSolicitud";
import { createRequest } from "./createrequest";
import { fetchHistorial } from "./fetchHistorial";
import { getAllServices } from "./getallservices";

export const LandingService = {
  getAllServices,
  createRequest,
  fetchHistorial,
  cancelarSolicitud,
};

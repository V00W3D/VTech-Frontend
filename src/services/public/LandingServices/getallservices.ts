import { api } from "@api";
import { landing } from "@endpoints/public";
import type { ApiResponse, ServiceType, Target } from "./types";

export const getAllServices = async (): Promise<
  ApiResponse<{ serviceTypes: ServiceType[]; targets: Target[] }>
> => {
  try {
    const { data } = await api.get(landing.allservices);
    return data;
  } catch (err: any) {
    console.error("[LandingService.getAllServices] Error:", err);
    throw new Error(
      err.response?.data?.message || "Error al obtener los servicios"
    );
  }
};

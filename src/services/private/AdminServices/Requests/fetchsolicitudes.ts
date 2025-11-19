// src/services/solicitudes/fetchSolicitudes.ts
import { api } from "@api"; // tu instancia de axios
import { solicitudes } from "@endpoints/private";
import type { Solicitud, ApiResponse } from "./types";

export const fetchSolicitudes = async (): Promise<ApiResponse<Solicitud[]>> => {
  try {
    const { data } = await api.get(solicitudes.fetch);
    return { ok: true, data: data.data, message: data.message };
  } catch (err: any) {
    return { ok: false, error: err.response?.data?.error || err.message };
  }
};

// src/services/solicitudes/finalizarSolicitud.ts
import { api } from "@api";
import { solicitudes } from "@endpoints/private";
import type { ApiResponse } from "./types";

export const finalizarSolicitud = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const endpoint = solicitudes.finalizar.replace(":id", id);
    const { data } = await api.put(endpoint);

    return { ok: true, message: data.message, url: data.url };
  } catch (err: any) {
    return { ok: false, error: err.response?.data?.error || err.message };
  }
};

// src/services/historial/cancelarSolicitud.ts
import { api } from "@api";
import { landing } from "@endpoints/public";
import type { ApiResponse } from "./types";

export const cancelarSolicitud = async (
  userId: string,
  requestId: string
): Promise<ApiResponse<null>> => {
  try {
    const endpoint = landing.cancelarSolicitud
      .replace(":userId", userId)
      .replace(":requestId", requestId);

    const { data } = await api.put(endpoint);

    return { ok: true, message: data.message };
  } catch (err: any) {
    return { ok: false, error: err.response?.data?.error || err.message };
  }
};

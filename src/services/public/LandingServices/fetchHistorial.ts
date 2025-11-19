// src/services/historial/fetchHistorial.ts
import { api } from "@api";
import { landing } from "@endpoints/public";
import type { ApiResponse } from "./types";
import type { Solicitud } from "./types";

export const fetchHistorial = async (
  userId: string
): Promise<ApiResponse<Solicitud[]>> => {
  try {
    const endpoint = landing.historial.replace(":userId", userId);
    const { data } = await api.get(endpoint);

    return { ok: true, data: data.data.data, message: data.message };
  } catch (err: any) {
    return { ok: false, error: err.response?.data?.error || err.message };
  }
};

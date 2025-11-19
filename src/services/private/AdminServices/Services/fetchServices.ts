import { api } from "@api";
import { servicios } from "@endpoints/private";
import type { FetchServicesResponse } from "./types";

export const fetchServices = async (): Promise<{
  ok: boolean;
  data?: FetchServicesResponse;
  error?: string;
}> => {
  try {
    const res = await api.get(servicios.fetch);
    return { ok: true, data: res.data.data };
  } catch (err: any) {
    console.error("❌ Error en fetchServices:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

import { api } from "@api";
import { servicios } from "@endpoints/private";
import type { CreateServiceInput, CreateServiceResponse } from "./types";

export const createService = async (
  data: CreateServiceInput
): Promise<{ ok: boolean; data?: CreateServiceResponse; error?: string }> => {
  try {
    const res = await api.post(servicios.crear, data);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.error("❌ Error en createService:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

import { api } from "@api";
import { servicios } from "@endpoints/private";
import type { EditServiceInput, EditServiceResponse } from "./types";

export const editService = async (
  input: EditServiceInput
): Promise<{ ok: boolean; data?: EditServiceResponse; error?: string }> => {
  try {
    const url = servicios.editar.replace(":id", input.id);
    const res = await api.put(url, input);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.error("❌ Error en editService:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

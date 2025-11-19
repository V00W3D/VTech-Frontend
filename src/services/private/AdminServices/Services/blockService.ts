import { api } from "@api";
import { servicios } from "@endpoints/private";
import type { BlockServiceInput, BlockServiceResponse } from "./types";

export const blockService = async (
  id: BlockServiceInput
): Promise<{ ok: boolean; data?: BlockServiceResponse; error?: string }> => {
  try {
    const url = servicios.bloquear.replace(":id", id);
    const res = await api.patch(url);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.error("❌ Error en blockService:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

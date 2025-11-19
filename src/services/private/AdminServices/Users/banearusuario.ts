// src/services/private/Users/banearUsuario.ts
import { api } from "@api";
import { usuarios } from "@endpoints/private";
import type { BanearUsuarioInput, BanearUsuarioResponse } from "./types";

export const banearUsuario = async (
  id: BanearUsuarioInput
): Promise<{ ok: boolean; data?: BanearUsuarioResponse; error?: string }> => {
  try {
    const url = usuarios.banear.replace(":id", id);
    const res = await api.patch(url);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.error("❌ Error en banearUsuario:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

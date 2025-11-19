// src/services/private/Users/editarUsuario.ts
import { api } from "@api";
import { usuarios } from "@endpoints/private";
import type { EditarUsuarioInput, EditarUsuarioResponse } from "./types";

export const editarUsuario = async (
  payload: EditarUsuarioInput
): Promise<{ ok: boolean; data?: EditarUsuarioResponse; error?: string }> => {
  try {
    const url = usuarios.editar.replace(":id", payload.id);
    const res = await api.put(url, payload.data);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.error("❌ Error en editarUsuario:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

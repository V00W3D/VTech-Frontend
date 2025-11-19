// src/services/private/Users/crearUsuario.ts
import { api } from "@api";
import { usuarios } from "@endpoints/private";
import type { CrearUsuarioInput, CrearUsuarioResponse } from "./types";

export const crearUsuario = async (
  payload: CrearUsuarioInput
): Promise<{ ok: boolean; data?: CrearUsuarioResponse; error?: string }> => {
  try {
    const res = await api.post(usuarios.crear, payload);
    return { ok: true, data: res.data };
  } catch (err: any) {
    console.error("❌ Error en crearUsuario:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

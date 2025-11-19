// src/services/private/Users/fetchUsuarios.ts
import { api } from "@api";
import { usuarios } from "@endpoints/private";
import type { FetchUsuariosResponse } from "./types";

export const fetchUsuarios = async (): Promise<{
  ok: boolean;
  data?: FetchUsuariosResponse["data"];
  error?: string;
}> => {
  try {
    const res = await api.get(usuarios.fetch);
    return { ok: true, data: res.data.data };
  } catch (err: any) {
    console.error("❌ Error en fetchUsuarios:", err);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

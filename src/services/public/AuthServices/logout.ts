import { api } from "@api";
import { auth } from "@endpoints/public/auth";
import type { ApiResponse } from "./types";

export const logout = async (): Promise<ApiResponse> => {
  try {
    const { data } = await api.post(auth.logout);
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Error al cerrar sesión");
  }
};

import { api } from "@api";
import { auth } from "@endpoints/public/auth";
import type { ApiResponse } from "./types";
import { loginSchema } from "./types";
export const login = async (
  Name: string,
  Pass: string
): Promise<ApiResponse> => {
  loginSchema.parse({ Name, Pass });

  try {
    const { data } = await api.post(auth.login, { Name, Pass });
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Error al iniciar sesión");
  }
};

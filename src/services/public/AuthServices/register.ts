import { api } from "@api";
import { auth } from "@endpoints/public/auth";
import type { ApiResponse } from "./types";
import { registerSchema } from "./types";
export const register = async (
  Name: string,
  Pass: string,
  Email: string,
  Phone: string,
  UserImg?: string
): Promise<ApiResponse> => {
  registerSchema.parse({ Name, Pass, Email, Phone, UserImg });

  try {
    const { data } = await api.post(auth.register, {
      Name,
      Pass,
      Email,
      Phone,
      UserImg,
    });
    return data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Error al registrar usuario"
    );
  }
};

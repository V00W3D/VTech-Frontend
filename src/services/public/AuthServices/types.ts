import { z } from "zod";

// =======================================================
// 🧾 Tipos base
// =======================================================
export interface User {
  Id: string;
  Name: string;
  Role: string;
  Phone: string;
  Email: string;
  UserImg?: string;
}

export interface ApiResponse {
  ok: boolean;
  message?: string;
  user?: User;
}

// =======================================================
// ✅ Schemas Zod
// =======================================================
export const loginSchema = z.object({
  Name: z.string().min(3, "El nombre es demasiado corto"),
  Pass: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
  Name: z.string().min(3),
  Pass: z.string().min(6),
  Email: z.string().email(),
  Phone: z.string().min(6),
  UserImg: z.string().optional(),
});

// src/services/private/Users/types.ts
import { z } from "zod";

// =============================
// 📌 Schemas
// =============================

// Crear usuario
export const CrearUsuarioSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(6, "Teléfono inválido."),
  password: z.string().min(4, "Contraseña demasiado corta."),
  userImg: z.string().optional(),
});

// Editar usuario
export const EditarUsuarioSchema = z.object({
  id: z.string().min(1, "ID inválido."),
  data: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
    userImg: z.string().optional(),
  }),
});

// ID simple
export const IdSchema = z.string().min(1, "ID inválido.");

// =============================
// 📌 Tipos derivados
// =============================
export type CrearUsuarioInput = z.infer<typeof CrearUsuarioSchema>;
export type EditarUsuarioInput = z.infer<typeof EditarUsuarioSchema>;
export type BanearUsuarioInput = z.infer<typeof IdSchema>;

// =============================
// 📌 Tipos de salida (Response)
// =============================
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  imagen?: string | null;
  eliminado: boolean;
}

export interface CrearUsuarioResponse {
  message: string;
}

export interface EditarUsuarioResponse {
  message: string;
}

export interface BanearUsuarioResponse {
  message: string;
}

export interface FetchUsuariosResponse {
  data: Usuario[];
  message: string;
}

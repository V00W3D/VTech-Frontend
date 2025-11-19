import { z } from "zod";

export interface Target {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ServiceType {
  _id: string;
  name: string;
  description: string;
  targets: Target[];
  image: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
}

export interface RequestData {
  _id: string;
  userId: string;
  serviceId: string;
  targetId: string;
  description: string;
  status: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// ✅ Esquema de validación para crear una solicitud
export const createRequestSchema = z.object({
  userId: z.string().min(10, "userId inválido"),
  service: z.string().min(10, "serviceId inválido"),
  target: z.string().min(10, "targetId inválido"),
  description: z.string().min(5, "La descripción es demasiado corta"),
});

export interface Usuario {
  id: string;
  nombre: string;
  telefono: string;
}

export interface Solicitud {
  id: string;
  estado: string;
  descripcion: string;
  fecha?: string;
  usuario: Usuario;
  // ahora servicio es un string o un objeto simple con nombre
  servicio: { id?: string | null; nombre: string } | string;
  target: string;
}

export type CreateRequestInput = z.infer<typeof createRequestSchema>;

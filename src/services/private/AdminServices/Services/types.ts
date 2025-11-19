// src/services/private/Services/types.ts

/* ============================================================
   🧩 Tipos base
   ============================================================ */

export interface Target {
  name: string;
  description?: string;
  icon?: string;
}

/* ============================================================
   💼 Entidad principal: Servicio
   ============================================================ */

export interface Servicio {
  id: string;
  name: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  image: string | null;
  targets: Target[]; // 🔥 YA NO HAY IDs
  deleted: boolean;
}

/* ============================================================
   📦 Respuesta genérica del backend
   ============================================================ */

export interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data?: T;
  url?: string;
  error?: string;
}

/* ============================================================
   📘 Operaciones CRUD
   ============================================================ */

// ✅ Crear servicio
export interface CreateServiceInput {
  name: string;
  slogan: string;
  shortDescription: string;
  longDescription: string;
  image?: string;

  // 🔥 AHORA targets es un array de objetos, NO de IDs
  targets: Target[];
}

export interface CreateServiceResponse {
  message: string;
  id?: string;
}

// ✏️ Editar servicio
export interface EditServiceInput {
  id: string;
  name?: string;
  slogan?: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;

  // 🔥 Igual que CreateServiceInput
  targets?: Target[];
  activo?: boolean;
}

export interface EditServiceResponse {
  message: string;
  id?: string;
}

// 📋 Listar servicios
export type FetchServicesResponse = Servicio[];

// 🚫 Bloquear servicio
export type BlockServiceInput = string;

export interface BlockServiceResponse {
  id: string;
  name: string;
  message: string;
}

/* ============================================================
   🧠 Namespace para importación agrupada
   ============================================================ */

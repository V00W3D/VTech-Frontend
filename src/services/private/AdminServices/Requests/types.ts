// src/services/types.ts
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

export interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data?: T;
  url?: string;
  error?: string;
}

// src/store/useAdminStore.ts
import { create } from "zustand";
import type { UserType, RequestType, ServiceType } from "@services/private";

interface AdminStoreState {
  usuarios: UserType.Usuario[]; // usuarios filtrados
  usuariosBackup: UserType.Usuario[]; // respaldo original

  solicitudes: RequestType.Solicitud[];
  servicios: ServiceType.Servicio[];

  // setters
  setUsuarios: (usuarios: UserType.Usuario[]) => void;
  setUsuariosBackup: (usuarios: UserType.Usuario[]) => void;

  setSolicitudes: (solicitudes: RequestType.Solicitud[]) => void;
  setServicios: (servicios: ServiceType.Servicio[]) => void;

  // filtros
  filtrarUsuarios: (query: string) => void;
}

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  usuarios: [],
  usuariosBackup: [],

  solicitudes: [],
  servicios: [],

  // 👉 setters de usuarios
  setUsuarios: (usuarios) => set({ usuarios }),
  setUsuariosBackup: (usuariosBackup) => set({ usuariosBackup }),

  // 👉 setters que faltaban
  setSolicitudes: (solicitudes) => set({ solicitudes }),
  setServicios: (servicios) => set({ servicios }),

  // 👉 filtro
  filtrarUsuarios: (query: string) => {
    const { usuariosBackup } = get();

    if (!query.trim()) {
      // Restaurar todos si está vacío
      return set({ usuarios: usuariosBackup });
    }

    const filtrados = usuariosBackup.filter((u) =>
      u.nombre.toLowerCase().includes(query.toLowerCase())
    );

    set({ usuarios: filtrados });
  },
}));

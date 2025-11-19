import { create } from "zustand";
import type { RequestType } from "@services/private";

interface UserStore {
  historial: RequestType.Solicitud[];
  setHistorial: (data: RequestType.Solicitud[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  historial: [],
  setHistorial: (data) => set({ historial: data }),
}));

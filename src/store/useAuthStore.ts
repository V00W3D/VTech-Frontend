import { create } from "zustand";

interface IAuth {
  user: {
    Id: string;
    Name: string;
    Role: string;
    UserImg?: string;
  } | null;
  isLogged: boolean;
  setUser: (user: {
    Id: string;
    Name: string;
    Role: string;
    UserImg?: string;
  }) => void;
  clearuser: () => void;
}

export const useAuthStore = create<IAuth>((set) => {
  // ⬇️ INTENTO: cargar user desde localStorage al iniciar
  let storedUser = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) storedUser = JSON.parse(raw);
  } catch (e) {
    console.error("⚠️ Error parseando user del localStorage:", e);
  }

  return {
    user: storedUser,
    isLogged: !!storedUser,

    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isLogged: true });
    },

    clearuser: () => {
      localStorage.removeItem("user");
      set({ user: null, isLogged: false });
    },
  };
});

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@store/useAuthStore";

export const useSession = () => {
  const { setUser } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const verifySession = useCallback(() => {
    setCheckingAuth(true);
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        return true;
      }
      return false;
    } catch (err) {
      console.warn("[useSession] No se pudo restaurar la sesión:", err);
      return false;
    } finally {
      setCheckingAuth(false);
    }
  }, [setUser]);

  useEffect(() => {
    verifySession();
  }, []);

  return { checkingAuth, refetchSession: verifySession };
};

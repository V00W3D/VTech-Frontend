import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/useAuthStore";

export const useLogout = () => {
  const { clearuser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      // 🧹 Limpieza local
      clearuser();
      localStorage.removeItem("user");

      // 🧭 Redirige al login
      navigate("/auth/login");
    } catch (err) {
      console.error("[useLogout] Error:", err);
      setIsError(true);
      alert("❌ Error al cerrar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, isError };
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@services/public";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const register = async (
    Name: string,
    Pass: string,
    Email: string,
    Phone: string
  ) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const res = await AuthService.register(Name, Pass, Email, Phone);
      if (!res.ok) throw new Error(res.message);

      alert("✅ Registro exitoso");
      setIsSuccess(true);
      navigate("/auth/login");
    } catch (err) {
      console.error("[useRegister] Error:", err);
      setIsError(true);
      alert("❌ Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, isSuccess, isError };
};

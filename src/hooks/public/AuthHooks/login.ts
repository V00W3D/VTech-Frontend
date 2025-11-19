import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/useAuthStore";
import { AuthService } from "@services/public";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const login = async (Name: string, Pass: string) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const res = await AuthService.login(Name, Pass);

      if (!res.ok || !res.user) throw new Error(res.message);

      const user = res.user;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.Role === "Admin" ? "/admin" : "/");
      console.log(user);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("[useLogin] Error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, isSuccess, isError };
};

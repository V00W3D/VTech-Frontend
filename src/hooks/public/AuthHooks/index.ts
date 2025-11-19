import { useLogin } from "./login";
import { useLogout } from "./logout";
import { useRegister } from "./register";
import { useSession } from "./session";

export const useAuth = {
  useLogin,
  useRegister,
  useLogout,
  useSession,
};

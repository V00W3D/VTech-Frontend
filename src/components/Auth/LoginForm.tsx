// src/components/Auth/LoginForm.tsx
import { useNavigate } from "react-router-dom";
import { AuthFieldBuilder, AuthButton } from "@common/FormBuilder";
import { useAuth } from "@hooks/public";
import VTechLogo from "@assets/VTechLogo.png";
import { useState } from "react";

const LoginForm = () => {
  document.title = "V Tech - Iniciando Sesión";
  const navigate = useNavigate();
  const { login, isLoading } = useAuth.useLogin();
  const [Name, setName] = useState("");
  const [Pass, setPass] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(Name, Pass);
  };

  return (
    <div className="auth-form-wrapper">
      <form className="formauth" onSubmit={handleLogin}>
        <img
          src={VTechLogo}
          alt="RGTech-Logo"
          className="auth-logo"
          onClick={() => navigate("/")} // 🏠 Navegar a la landing
        />
        <h1 className="auth-title">Iniciando Sesión</h1>

        <div className="input-container">
          <AuthFieldBuilder
            id="Name"
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            label="Usuario"
          />
        </div>

        <div className="input-container">
          <AuthFieldBuilder
            id="Pass"
            type="password"
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
            label="Contraseña"
          />
        </div>

        <AuthButton type="submit" text="Ingresar" loading={isLoading} />

        <AuthButton
          type="button"
          text="¿No tienes una Cuenta? Registrate"
          variant="link"
          onClick={() => navigate("/auth/register")} // 🧭 Navegar al registro
        />
      </form>
    </div>
  );
};

export default LoginForm;

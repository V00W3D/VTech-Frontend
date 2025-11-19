// src/components/Auth/RegisterForm.tsx
import { useNavigate } from "react-router-dom";
import { AuthFieldBuilder, AuthButton } from "@common/FormBuilder";
import { useAuth } from "@hooks/public";
import VTechLogo from "@assets/VTechLogo.png";
import { useState } from "react";

const RegisterForm = () => {
  document.title = "V Tech - Registrandose";
  const navigate = useNavigate();
  const { register, isLoading, isSuccess } = useAuth.useRegister();
  const [Name, setName] = useState("");
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(Name, Pass, Email, Phone);

    if (isSuccess) {
      // ✅ Redirigir automáticamente al login después de un registro exitoso
      navigate("/auth/login");
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form className="formauth" onSubmit={handleRegister}>
        <img
          src={VTechLogo}
          alt="RGTech-Logo"
          className="auth-logo"
          onClick={() => navigate("/")} // 🏠 Volver a la landing
        />
        <h1 className="auth-title">Registrarse</h1>

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

        <div className="input-container">
          <AuthFieldBuilder
            id="Phone"
            type="tel"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Teléfono"
          />
        </div>

        <div className="input-container">
          <AuthFieldBuilder
            id="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            label="Correo Electrónico"
          />
        </div>

        <AuthButton type="submit" text="Registrarse" loading={isLoading} />

        <AuthButton
          type="button"
          text="¿Ya tienes una Cuenta? Inicia Sesión"
          variant="link"
          onClick={() => navigate("/auth/login")} // 🧭 Volver al login
        />
      </form>
    </div>
  );
};

export default RegisterForm;

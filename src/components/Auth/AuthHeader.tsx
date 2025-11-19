// src/components/Auth/features/AuthHeader.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SmoothNavbarBuilder } from "@common/SmoothNavBarBuilder";

const AuthHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Estado local para el modo activo
  const [mode, setMode] = useState<"login" | "register">("login");

  // Detecta automáticamente el modo según la URL
  useEffect(() => {
    if (location.pathname.includes("/auth/register")) setMode("register");
    else setMode("login");
  }, [location.pathname]);

  // Botones de navegación
  const buttons = [
    { name: "login", label: "Iniciar Sesión", mode: "login" },
    { name: "register", label: "Registrarse", mode: "register" },
  ];

  return (
    <SmoothNavbarBuilder
      logo={undefined} // Si querés, agregá una imagen o texto de logo
      logoText=""
      basePath="/auth"
      buttons={buttons.map((b) => ({
        id: b.name,
        label: b.label,
        mode: b.mode,
      }))}
      activeMode={mode}
      onModeChange={(newMode) => {
        if (newMode === "login" || newMode === "register") {
          setMode(newMode);
          navigate(`/auth/${newMode}`);
        }
      }}
    />
  );
};

export default AuthHeader;

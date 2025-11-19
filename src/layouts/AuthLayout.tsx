// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import AuthHeader from "@components/Auth/AuthHeader";

//=========================================================
// Estilos
//=========================================================
// Header
import "@CSS/AuthLayout/Header/General.css";
import "@CSS/AuthLayout/Header/Animations.css";
import "@CSS/AuthLayout/Header/Responsive.css";
// Formularios
import "@CSS/AuthLayout/Forms/General.css";
import "@CSS/AuthLayout/Forms/Animations.css";
import "@CSS/AuthLayout/Forms/Responsive.css";
// Formularios -> Partes -> Button
import "@CSS/AuthLayout/Forms/Parts/Button/General.css";
import "@CSS/AuthLayout/Forms/Parts/Button/Animations.css";
import "@CSS/AuthLayout/Forms/Parts/Button/Responsive.css";
// Formularios -> Partes -> Fields
import "@CSS/AuthLayout/Forms/Parts/Fields/General.css";
import "@CSS/AuthLayout/Forms/Parts/Fields/Animations.css";
import "@CSS/AuthLayout/Forms/Parts/Fields/Responsive.css";

const AuthLayout = () => {
  // 🧭 Sincronizar el modo según la URL actual

  return (
    <>
      <header className="header">
        <AuthHeader />
      </header>
      <main className="auth-content">
        <Outlet /> {/* Aquí React Router cargará LoginForm o RegisterForm */}
      </main>
    </>
  );
};

export default AuthLayout;

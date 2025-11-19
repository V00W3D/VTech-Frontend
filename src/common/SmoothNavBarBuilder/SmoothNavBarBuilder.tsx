// src/components/common/SmoothNavbar/SmoothNavbarBuilder.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SmoothNavbarBuilderProps } from "./Types";
import { LogoBuilder } from "./LogoBuilder";
import { ButtonsBuilder } from "./ButtonsBuilder";
import "@CSS/SmoothNavBar/General.css";

export function SmoothNavbarBuilder({
  logo,
  logoText,
  basePath,
  buttons = [],
  activeMode,
  onModeChange,
}: SmoothNavbarBuilderProps) {
  const navigate = basePath !== "#" ? useNavigate() : null;
  const [scrolled, setScrolled] = useState(false);

  // 🎢 Efecto dinámico: cambia el fondo cuando scrolleás
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const navbar = document.querySelector(".smooth-navbar");
      if (!navbar) return;

      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        navbar.classList.add("hide");
      } else {
        navbar.classList.remove("hide");
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSwitch = (mode: string) => {
    onModeChange(mode);

    if (basePath === "#") {
      // 📜 Navegación interna (smooth scroll dentro de la misma página)
      const element = document.getElementById(
        mode.toLowerCase().replace(/\s+/g, "-")
      );
      if (element) {
        const offset = 80; // altura del navbar (ajustá según tu diseño)
        const y = element.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
      return;
    }

    // 🧭 Navegación entre rutas (con transición suave tipo fade)
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.35s ease";

    setTimeout(() => {
      const path = `/${basePath.replace(/^\/?/, "")}/${mode}`;
      navigate?.(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.opacity = "1";
    }, 200);
  };

  return (
    <nav className={`smooth-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="smooth-navbar-container">
        <LogoBuilder logo={logo} logoText={logoText} basePath={basePath} />
        <ButtonsBuilder
          buttons={buttons}
          activeMode={activeMode}
          onSwitch={handleSwitch}
        />
      </div>
    </nav>
  );
}

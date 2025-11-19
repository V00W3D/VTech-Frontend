// src/components/landing/ServicesNavbar.tsx
import { useLanding } from "@hooks/public";
import { useState } from "react";
import { SmoothNavbarBuilder } from "@common/SmoothNavBarBuilder/index";
import type { NavbarButton } from "@common/SmoothNavBarBuilder/index";

const ServicesNavbar: React.FC = () => {
  const [activeType, setActiveType] = useState<string>("");
  const { services, isLoading } = useLanding.useGetAllServices();

  // 🧠 Generamos los botones dinámicamente
  const buttons: NavbarButton[] = services.map((service) => ({
    mode: service.name, // lo usamos como ID interno
    label: service.name,
  }));

  // 🎯 Acción al hacer clic en un botón
  const handleModeChange = (mode: string) => {
    const element = document.getElementById(
      mode.toLowerCase().replace(/\s+/g, "-")
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveType(activeType === mode ? "" : mode);
  };

  if (isLoading) {
    return (
      <nav className="smooth-navbar" id="servicios">
        <div className="smooth-navbar-container">
          <ul className="smooth-nav">
            <li className="smooth-nav-item">
              <button className="smooth-nav-btn active">
                <span>Cargando servicios...</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <div id="servicios">
      <SmoothNavbarBuilder
        basePath="#" // no navega entre rutas, solo scroll interno
        activeMode={activeType}
        onModeChange={handleModeChange}
        buttons={[...buttons, { mode: "home", label: "Inicio" }]}
      />
    </div>
  );
};

export default ServicesNavbar;

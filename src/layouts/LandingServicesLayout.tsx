import React from "react";
import { useLanding } from "@hooks/public";
import ServiceSectionBuilder from "@components/Landing/ServiceSectionBuilder"; // 👈 asegúrate de que la ruta esté en minúsculas
//=========================================================
import "@CSS/LandingLayout/ServicesSection/General.css";
import "@CSS/LandingLayout/ServicesSection/Animations.css";
import "@CSS/LandingLayout/ServicesSection/Responsive.css";
//=========================================================
import "@CSS/LandingLayout/ServicesSection/Parts/Buttons/General.css";
import "@CSS/LandingLayout/ServicesSection/Parts/Buttons/Animations.css";
import "@CSS/LandingLayout/ServicesSection/Parts/Buttons/Responsive.css";
//=========================================================
import "@CSS/LandingLayout/ServicesSection/Parts/TargetGrid/General.css";
import "@CSS/LandingLayout/ServicesSection/Parts/TargetGrid/Animations.css";
import "@CSS/LandingLayout/ServicesSection/Parts/TargetGrid/Responsive.css";
//=========================================================
import "@CSS/LandingLayout/ModalRequest/General.css";
import "@CSS/LandingLayout/ModalRequest/Animations.css";
import "@CSS/LandingLayout/ModalRequest/Responsive.css";

const LandingServicesLayout: React.FC = () => {
  const { services, targets, isLoading, isError } =
    useLanding.useGetAllServices();

  if (isLoading) {
    return <div className="loading-state">Cargando servicios...</div>;
  }

  if (isError) {
    return (
      <div className="error-state">{"Error al cargar los servicios."}</div>
    );
  }

  if (!services?.length) {
    return (
      <div className="empty-state">
        No hay servicios disponibles en este momento.
      </div>
    );
  }

  return (
    <main className="landing-services-layout">
      {services.map((service) => (
        <ServiceSectionBuilder
          key={service._id}
          service={service}
          targets={targets}
        />
      ))}
    </main>
  );
};

export default LandingServicesLayout;

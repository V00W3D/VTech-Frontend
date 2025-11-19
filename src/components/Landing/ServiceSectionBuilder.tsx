import React, { useState } from "react";
import TargetGrid from "./features/ServicesLanding/TargetGrid";
import RequestModal from "./features/Modals/RequestModal";
import { useAuthStore } from "@store/useAuthStore";
import type { LandingTypes } from "@services/public";

interface Props {
  service: LandingTypes.ServiceType;
  targets: LandingTypes.Target[];
}

const ServiceSectionBuilder: React.FC<Props> = ({ service, targets }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthStore();

  const filteredTargets = targets.filter((t) =>
    service.targets.some((st) => st._id === t._id)
  );

  const handleRequest = () => {
    console.log("🧩 Abriendo modal para servicio:", service.name);
    setShowModal(true);
  };

  return (
    <section
      id={service.name.toLowerCase().replace(/\s+/g, "-")}
      className="service-section"
    >
      <h2 className="service-title">{service.name}</h2>

      {service.image && (
        <img src={service.image} alt={service.name} className="service-image" />
      )}

      <p className="service-slogan">{service.shortDescription}</p>
      <p className="service-description">{service.longDescription}</p>

      {filteredTargets.length > 0 && (
        <TargetGrid
          serviceName={service.name}
          targets={filteredTargets}
          onRequest={handleRequest}
        />
      )}

      <RequestModal
        show={showModal}
        onClose={() => setShowModal(false)}
        serviceName={service.name}
        clientName={user?.Name}
        targets={filteredTargets}
      />
    </section>
  );
};

export default ServiceSectionBuilder;

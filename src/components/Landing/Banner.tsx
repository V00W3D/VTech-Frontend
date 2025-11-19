import React from "react";
import VTechLogo from "@assets/VTechLogo.png";

const BannerVTech: React.FC = () => {
  return (
    <section className="banner-vtech">
      {/* LOGO */}
      <div className="banner-logo-container">
        <img src={VTechLogo} alt="V Tech Logo" className="banner-logo" />
      </div>

      {/* CAROUSEL */}
    </section>
  );
};

export default BannerVTech;

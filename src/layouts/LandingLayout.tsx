import Header from "@components/Landing/Header";
//=========================================================
// Header
//=========================================================
import "@CSS/LandingLayout/Header/General.css";
import "@CSS/LandingLayout/Header/Animations.css";
import "@CSS/LandingLayout/Header/Responsive.css";
//=========================================================
// Header -> Partes -> ProfileCard
//=========================================================
import "@CSS/LandingLayout/Header/Parts/ProfileCard/General.css";
import "@CSS/LandingLayout/Header/Parts/ProfileCard/Animations.css";
import "@CSS/LandingLayout/Header/Parts/ProfileCard/Responsive.css";
//=========================================================
// Header -> Partes -> NavBarLeft
//=========================================================
import "@CSS/LandingLayout/Header/Parts/NavBarLeft/General.css";
import "@CSS/LandingLayout/Header/Parts/NavBarLeft/Animations.css";
import "@CSS/LandingLayout/Header/Parts/NavBarLeft/Responsive.css";
//=========================================================
// Header -> Partes -> NavBarNav
//=========================================================
import "@CSS/LandingLayout/Header/Parts/NavBarNav/General.css";
import "@CSS/LandingLayout/Header/Parts/NavBarNav/Animations.css";
import "@CSS/LandingLayout/Header/Parts/NavBarNav/Responsive.css";
//=========================================================
// Header -> Partes -> ContactInfo
//=========================================================
import "@CSS/LandingLayout/Header/Parts/ContactInfo/General.css";
import "@CSS/LandingLayout/Header/Parts/ContactInfo/Animations.css";
import "@CSS/LandingLayout/Header/Parts/ContactInfo/Responsive.css";
//=========================================================
// Header -> Partes -> ContactDropdown
//=========================================================
import "@CSS/LandingLayout/Header/Parts/ContactDropdown/General.css";
import "@CSS/LandingLayout/Header/Parts/ContactDropdown/Animations.css";
import "@CSS/LandingLayout/Header/Parts/ContactDropdown/Responsive.css";

//=========================================================
import Banner from "@components/Landing/Banner";
//=========================================================
// Banner
//=========================================================
import "@CSS/LandingLayout/Banner/General.css";
import "@CSS/LandingLayout/Banner/Animations.css";
import "@CSS/LandingLayout/Banner/Responsive.css";

//=========================================================
import ServicesNavbar from "@components/Landing/ServicesNavBar";
//=========================================================
// ServicesNavBar
//=========================================================
import "@CSS/LandingLayout/ServicesNavBar/General.css";
import "@CSS/LandingLayout/ServicesNavBar/Animations.css";
import "@CSS/LandingLayout/ServicesNavBar/Responsive.css";

//=========================================================
import LandingServicesLayout from "./LandingServicesLayout";
import { Outlet } from "react-router-dom";
import Footer from "@components/Landing/Footer";
const LandingLayout = () => {
  document.title = "V Tech - Inicio";

  return (
    <>
      <Header />
      <Banner />
      <ServicesNavbar />
      <LandingServicesLayout />
      <Outlet />
      <Footer />
    </>
  );
};

export default LandingLayout;

import ContactDropdown from "./ContactDropdown";

const NavbarNav = () => {
  return (
    <div className="slime-navbar-nav">
      <a href="#home">
        <span>Inicio</span>
      </a>
      <a href="#servicios">
        <span>Servicios</span>
      </a>

      <ContactDropdown />
    </div>
  );
};

export default NavbarNav;

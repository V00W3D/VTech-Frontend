import { useAuthStore } from "@store/useAuthStore";
import NavbarLeft from "@components/Landing/features/HeaderLanding/NavBarLeft";
import NavbarNav from "@components/Landing/features/HeaderLanding/NavBarNav";

const Header = () => {
  const { isLogged, user } = useAuthStore();

  return (
    <header className="slime-header" id="home">
      <nav className="slime-navbar">
        <div className="slime-navbar-container">
          <NavbarLeft isLogged={isLogged} user={user} />
          <NavbarNav />
        </div>
      </nav>
    </header>
  );
};

export default Header;

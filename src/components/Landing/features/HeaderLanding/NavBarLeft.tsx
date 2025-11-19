import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import VTechLogo from "@assets/VTechLogo.png";
import ProfileCard from "@components/Landing/features/HeaderLanding/ProfileCard";

interface NavbarLeftProps {
  isLogged: boolean;
  user: any;
}

const NavbarLeft = ({ isLogged, user }: NavbarLeftProps) => {
  const navigate = useNavigate();

  const goToAuth = (mode: "login" | "register") => {
    navigate(`/auth/${mode}`);
  };

  return (
    <div className="slime-navbar-left">
      {/* Perfil */}
      {isLogged && user && <ProfileCard />}

      {/* 🔥 BOTÓN DE HISTORIAL — SOLO PARA LOGUEADOS */}
      {isLogged && (
        <a
          onClick={() => navigate(`/historial`)}
          className="slime-history-btn"
          title="Ver historial"
        >
          <FaHistory size={20} />
        </a>
      )}

      {/* Botones Login/Register */}
      {!isLogged && (
        <div className="slime-auth-buttons">
          <a onClick={() => goToAuth("login")} className="slime-auth-btn">
            <span>Logearse</span>
          </a>
          <a onClick={() => goToAuth("register")} className="slime-auth-btn">
            <span>Registrarse</span>
          </a>
        </div>
      )}

      {/* Logo */}
      <a onClick={() => navigate("/auth/login")} className="slime-navbar-brand">
        <img src={VTechLogo} alt="Cambiar de cuenta" />
      </a>
    </div>
  );
};

export default NavbarLeft;

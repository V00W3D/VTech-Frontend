import { useAuthStore } from "@store/useAuthStore";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useAuth } from "@hooks/public";

const ProfileCard = () => {
  const { user } = useAuthStore();
  const [hovered, setHovered] = useState(false);
  const { logout, isLoading } = useAuth.useLogout();

  if (!user) return null;

  return (
    <div
      className="profile-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !isLoading && logout()}
      title={hovered ? "Cerrar sesión" : "Usuario activo"}
      style={{ cursor: isLoading ? "wait" : "pointer" }}
    >
      <div className="profile-avatar">
        {hovered ? (
          <FaPowerOff className="logout-icon" />
        ) : (
          <span>{user.Name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div className="profile-info">
        <p className="profile-name">{user.Name.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

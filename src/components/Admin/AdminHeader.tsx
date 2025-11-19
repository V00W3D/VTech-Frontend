// components/admin/AdminHeader.tsx
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@store/useAuthStore";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
  const { user, clearuser } = useAuthStore();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = () => {
    clearuser();
    navigate("/auth/login");
  };

  return (
    <header className="admin-header fade-in">
      <div className="admin-header__left">
        <h2 className="admin-header__greeting">
          Bienvenido, <span>{user.Name}</span>
        </h2>
      </div>

      <div
        className="admin-header__avatar-wrapper"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="admin-header__avatar">
          {user.UserImg ? (
            <img src={user.UserImg} alt="Admin Avatar" />
          ) : (
            <span>{user.Name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.button
              onClick={handleLogout}
              className="admin-header__logout"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              title="Cerrar sesión"
            >
              <FaPowerOff />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default AdminHeader;

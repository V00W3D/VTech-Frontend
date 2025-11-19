// src/components/Admin/features/AdminHeader/AdminSectionsNavBar.tsx
import { NavLink } from "react-router-dom";

interface Section {
  id: string;
  name: string;
  path: string;
}

const sections: Section[] = [
  { id: "usuarios", name: "Usuarios", path: "/admin/usuarios" },
  { id: "solicitudes", name: "Solicitudes", path: "/admin/solicitudes" },
  { id: "servicios", name: "Servicios", path: "/admin/servicios" },
];

const AdminSectionsNavbar: React.FC = () => {
  return (
    <nav className="admin-navbar">
      <ul className="smooth-nav">
        {sections.map((section) => (
          <li key={section.id} className="smooth-nav-item">
            <NavLink
              to={section.path}
              end
              className={({ isActive }) =>
                `smooth-nav-btn ${isActive ? "active" : ""}`
              }
            >
              <span>{section.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminSectionsNavbar;

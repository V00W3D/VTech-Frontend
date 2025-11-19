// src/components/common/SmoothNavbar/DropdownBuilder.tsx
import { useNavigate } from "react-router-dom";
import type { NavbarDropdownItem } from "./Types";

interface DropdownBuilderProps {
  items: NavbarDropdownItem[];
  onClose: () => void;
}

export function DropdownBuilder({ items, onClose }: DropdownBuilderProps) {
  const navigate = useNavigate();

  return (
    <ul className="smooth-dropdown">
      {items.map((item) => (
        <li
          key={item.label}
          className="smooth-dropdown-item"
          onClick={() => {
            onClose();
            if (item.onClick) item.onClick();
            if (item.to) navigate(item.to);
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}

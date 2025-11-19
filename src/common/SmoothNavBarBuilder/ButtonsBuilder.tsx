// src/components/common/SmoothNavbar/ButtonsBuilder.tsx
import { useState } from "react";
import type { NavbarButton } from "./Types";
import { DropdownBuilder } from "./DropdownBuilder";

interface ButtonsBuilderProps {
  buttons: NavbarButton[];
  activeMode: string;
  onSwitch: (mode: string) => void;
}

export function ButtonsBuilder({
  buttons,
  activeMode,
  onSwitch,
}: ButtonsBuilderProps) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) =>
    setOpenDropdownIndex((prev) => (prev === index ? null : index));

  return (
    <ul className="smooth-nav">
      {buttons.map((btn, index) => (
        <li key={btn.mode} className="smooth-nav-item">
          <button
            className={`smooth-nav-btn ${
              activeMode === btn.mode ? "active" : ""
            }`}
            onClick={() =>
              btn.dropdown ? toggleDropdown(index) : onSwitch(btn.mode)
            }
          >
            <span>{btn.label}</span>
          </button>

          {btn.dropdown && openDropdownIndex === index && (
            <DropdownBuilder
              items={btn.dropdown}
              onClose={() => setOpenDropdownIndex(null)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

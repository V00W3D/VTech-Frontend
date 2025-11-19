// src/components/common/SmoothNavbar/Types.ts

export interface NavbarDropdownItem {
  label: string;
  to?: string;
  onClick?: () => void;
}

export interface NavbarButton {
  mode: string;
  label: string;
  dropdown?: NavbarDropdownItem[];
}

export interface SmoothNavbarBuilderProps {
  logo?: string;
  logoText?: string;
  basePath: string;
  buttons?: NavbarButton[];
  activeMode: string;
  onModeChange: (mode: string) => void;
}

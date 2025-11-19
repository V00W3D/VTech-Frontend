// src/components/common/SmoothNavbar/LogoBuilder.tsx
import { useNavigate } from "react-router-dom";

interface LogoBuilderProps {
  logo?: string;
  logoText?: string;
  basePath: string;
}

export function LogoBuilder({ logo, logoText, basePath }: LogoBuilderProps) {
  const navigate = useNavigate();

  if (!logo && !logoText) return null;

  return (
    <div className="smooth-logo" onClick={() => navigate(basePath || "/")}>
      {logo && <img src={logo} alt="Logo" className="smooth-logo-img" />}
      {logoText && <h2>{logoText}</h2>}
    </div>
  );
}

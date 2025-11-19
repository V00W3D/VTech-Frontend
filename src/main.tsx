import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createPortal } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
export const Portal = ({ children }: { children: React.ReactNode }) => {
  const portalRoot = document.getElementById("portal-root");
  return portalRoot ? createPortal(children, portalRoot) : null;
};

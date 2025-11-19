import React from "react";
import type { ModalTitleProps } from "./Types";

export const ModalTitle: React.FC<ModalTitleProps> = ({ children }) => (
  <h3 className="modal-title">{children}</h3>
);

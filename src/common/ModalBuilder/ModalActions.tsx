import React from "react";
import type { ModalActionsProps } from "./Types";

export const ModalActions: React.FC<ModalActionsProps> = ({ children }) => (
  <div className="modal-actions">{children}</div>
);

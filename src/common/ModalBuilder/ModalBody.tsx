import React from "react";
import type { ModalBodyProps } from "./Types";

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className="modal-body">{children}</div>
);

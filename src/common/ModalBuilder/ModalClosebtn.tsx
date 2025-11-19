import React from "react";
import type { ModalCloseButtonProps } from "./Types";

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClick,
}) => (
  <button className="modal-close-btn" onClick={onClick}>
    ✕
  </button>
);

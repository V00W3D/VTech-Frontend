import { motion } from "framer-motion";
import React from "react";
import type { ModalContainerProps } from "./Types";

export const ModalContainer: React.FC<ModalContainerProps> = ({
  width = "600px",
  onClick,
  children,
}) => (
  <motion.div
    className="modal-container"
    style={{ maxWidth: width }}
    initial={{ scale: 0.9, opacity: 0, y: -20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.9, opacity: 0, y: -20 }}
    transition={{ duration: 0.25 }}
    onClick={(e) => {
      e.stopPropagation();
      if (onClick) onClick(e);
    }}
  >
    {children}
  </motion.div>
);

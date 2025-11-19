import { motion } from "framer-motion";
import React from "react";
import type { ModalOverlayProps } from "./Types";

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  onClick,
  children,
}) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

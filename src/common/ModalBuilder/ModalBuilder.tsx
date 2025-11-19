import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { Portal } from "@main"; // 👈 importá tu portal global
import "@CSS/Builders/ModalBuilder.css";

interface ModalBuilderProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
  width: string;
}

export default function ModalBuilder({
  show,
  title,
  children,
  onClose,
  actions,
  width = "500px",
}: ModalBuilderProps) {
  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="modal-container"
              style={{ maxWidth: width }}
              initial={{ scale: 0.9, opacity: 0, y: -30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -30 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {title && <h3 className="modal-title mb-3">{title}</h3>}

              <div className="modal-body">{children}</div>

              {actions && <div className="modal-actions mt-3">{actions}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

ModalBuilder.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.node,
  width: PropTypes.string,
};

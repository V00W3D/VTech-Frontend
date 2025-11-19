import React from "react";

export interface ModalBuilderProps {
  /** Controla si el modal está visible */
  show: boolean;
  /** Título opcional del modal */
  title?: string;
  /** Contenido JSX del cuerpo (puede ser un componente entero) */
  children: React.ReactNode;
  /** Acción al cerrar */
  onClose: () => void;
  /** Acciones o botones opcionales del footer */
  actions?: React.ReactNode;
  /** Ancho máximo del modal */
  width?: string;
  /** Cierra al hacer click fuera */
  closeOnOverlayClick?: boolean;
}

export interface ModalContainerProps {
  width?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export interface ModalOverlayProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export interface ModalCloseButtonProps {
  onClick: () => void;
}

export interface ModalTitleProps {
  children: React.ReactNode;
}

export interface ModalBodyProps {
  children: React.ReactNode;
}

export interface ModalActionsProps {
  children: React.ReactNode;
}

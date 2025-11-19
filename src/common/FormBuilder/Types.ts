import type { ChangeEvent } from "react";

// Types.ts
export interface AuthFieldBuilderProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "password" | "email" | "textarea" | "tel";
}

export interface AuthButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  variant?: "primary" | "link";
  disabled?: boolean;
}

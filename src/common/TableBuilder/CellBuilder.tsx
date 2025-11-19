import React from "react";

interface CellBuilderProps {
  as?: "td" | "th";
  className?: string;
  children?: React.ReactNode;
}

export const CellBuilder: React.FC<CellBuilderProps> = ({
  as: Tag = "td",
  className = "",
  children,
}) => <Tag className={`table-cell ${className}`}>{children}</Tag>;

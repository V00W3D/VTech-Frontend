import React from "react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T] | any, row: T) => React.ReactNode;
}

export interface TableBuilderProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

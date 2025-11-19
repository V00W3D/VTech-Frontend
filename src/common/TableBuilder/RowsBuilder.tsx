import React from "react";
import type { TableColumn } from "./Types";
import { CellBuilder } from "./CellBuilder";

interface RowsBuilderProps<T extends { id?: string | number }> {
  data: T[];
  columns: TableColumn<T>[];
  renderActions?: (row: T) => React.ReactNode;
  updatedIds: (string | number)[];
}

export function RowsBuilder<T extends { id?: string | number }>({
  data,
  columns,
  renderActions,
  updatedIds,
}: RowsBuilderProps<T>) {
  return (
    <tbody className="table-body">
      {data.map((row, i) => (
        <tr
          key={row.id ?? i}
          className={`table-row ${
            updatedIds.includes(row.id!) ? "row-updated" : ""
          }`}
        >
          {columns.map((col) => (
            <CellBuilder key={String(col.key)}>
              {col.render
                ? col.render(row[col.key], row)
                : (row[col.key] as React.ReactNode)}
            </CellBuilder>
          ))}
          {renderActions && <CellBuilder>{renderActions(row)}</CellBuilder>}
        </tr>
      ))}
    </tbody>
  );
}

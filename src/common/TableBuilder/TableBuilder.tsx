import React, { useEffect, useState } from "react";
import { ColumnsBuilder } from "./ColumnsBuilder";
import { RowsBuilder } from "./RowsBuilder";
import "@CSS/Builders/TableBuilder.css";
import type { TableColumn } from "./Types";

interface TableBuilderProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

export default function TableBuilder<T extends { id?: string | number }>({
  columns,
  data,
  renderActions,
  emptyMessage = "No hay datos disponibles.",
}: TableBuilderProps<T>) {
  const [rows, setRows] = useState<T[]>(data);
  const [updatedIds, setUpdatedIds] = useState<(string | number)[]>([]);

  useEffect(() => {
    const nuevos = data.filter(
      (newRow) =>
        !rows.find(
          (oldRow) =>
            oldRow.id === newRow.id &&
            JSON.stringify(oldRow) === JSON.stringify(newRow)
        )
    );
    setRows(data);
    if (nuevos.length > 0) {
      setUpdatedIds(nuevos.map((r) => r.id!).filter(Boolean));
      const timeout = setTimeout(() => setUpdatedIds([]), 800);
      return () => clearTimeout(timeout);
    }
  }, [data]);

  if (!rows || rows.length === 0)
    return <p className="table-empty">{emptyMessage}</p>;

  return (
    <div className="table-wrapper fade-in">
      <table className="custom-table">
        <ColumnsBuilder columns={columns} renderActions={!!renderActions} />
        <RowsBuilder
          data={rows}
          columns={columns}
          renderActions={renderActions}
          updatedIds={updatedIds}
        />
      </table>
    </div>
  );
}

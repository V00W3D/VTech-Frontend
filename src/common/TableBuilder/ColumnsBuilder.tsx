import type { TableColumn } from "./Types";
import { CellBuilder } from "./CellBuilder";

interface ColumnsBuilderProps<T> {
  columns: TableColumn<T>[];
  renderActions?: boolean;
}

export function ColumnsBuilder<T>({
  columns,
  renderActions,
}: ColumnsBuilderProps<T>) {
  return (
    <thead className="table-header">
      <tr>
        {columns.map((col, idx) => (
          <CellBuilder
            key={String(col.key)}
            as="th"
            className={`header-cell ${
              idx === 0
                ? "rounded-left"
                : idx === columns.length - 1 && !renderActions
                ? "rounded-right"
                : ""
            }`}
          >
            {col.label}
          </CellBuilder>
        ))}
        {renderActions && (
          <CellBuilder as="th" className="header-cell rounded-right">
            Acciones
          </CellBuilder>
        )}
      </tr>
    </thead>
  );
}

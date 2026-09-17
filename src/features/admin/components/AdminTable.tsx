import type { ReactNode } from 'react';

export type AdminTableColumn<T> = {
  key: string;
  label: string;
  width?: string;
  render: (row: T) => ReactNode;
};

type AdminTableProps<T extends { id: string | number }> = {
  columns: AdminTableColumn<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
};

export default function AdminTable<T extends { id: string | number }>({
  columns,
  rows,
  onRowClick,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-[0_1px_2px_rgba(75,69,69,0.2)]">
      <table className="w-full table-fixed border-collapse text-base text-gray-800">
        <thead className="bg-gray-200 text-gray-900">
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }} className="h-[50px] px-4 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-200/50' : undefined}
            >
              {columns.map((column) => (
                <td key={column.key} className="h-14 truncate border-t border-gray-200 px-4 text-center">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

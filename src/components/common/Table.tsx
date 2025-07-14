import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type AccessorKeyColumnDef,
} from "@tanstack/react-table";
import classNames from "classnames";

interface Props<T> {
  tableData: T[];
  columns: AccessorKeyColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
  isHeaderClickable?: boolean; // 테이블 헤더 클릭 가능 여부 (정렬)
}

export const Table = <T,>({
  tableData,
  columns,
  onRowClick,
  isHeaderClickable,
}: Props<T>) => {
  const [data, setData] = useState([...tableData]);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-full h-full border-gray-200 border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-indigo-100 ">
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                className={classNames("p-4", {
                  "rounded-tl-2xl": index === 0,
                  "rounded-tr-2xl": index === columns.length - 1,
                  "cursor-pointer": isHeaderClickable && tableData.length > 0,
                })}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            className={classNames("hover:bg-gray-100", {
              "cursor-pointer": !!onRowClick,
            })}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="p-4 border-b border-t border-gray-300"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

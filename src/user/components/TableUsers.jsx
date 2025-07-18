import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';

const TableUsers = ({ data, onSelectUser }) => {
  const [sorting, setSorting] = React.useState([]);
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'nombre', header: 'Nombre' },
    { accessorKey: 'correo', header: 'Correo' },
    { accessorKey: 'rol', header: 'Tipo' },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onSelectUser(row.original)}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => console.log('Delete', row.original)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-y-auto max-h-[400px]">
      <table className="min-w-full bg-zinc-700  rounded-md shadow">
        <thead className="bg-zinc-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-6 py-3 text-left text-sm font-medium text-white cursor-pointer select-none"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-zinc-600">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-sm border-t border-zinc-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TableUsers);

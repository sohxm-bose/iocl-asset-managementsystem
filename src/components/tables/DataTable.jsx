import { Eye, Pencil, Trash2 } from "lucide-react";

export default function DataTable({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left"
              >
                {column.label}
              </th>
            ))}

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="border-t hover:bg-slate-50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3"
                >
                  {row[column.key]}
                </td>
              ))}

              <td className="px-4 py-3">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onView(row)}
                    className="text-blue-500"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(row)}
                    className="text-green-500"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useState } from "react";
import { _users } from "../../../_mock";
import { useColumns } from "../hooks/use-columns";
import { useUsersTable } from "../hooks/use-users-table";
import { TableNoData } from "../hooks/table-no-data";
import { flexRender } from "@tanstack/react-table";
import UserTableToolbar from "../hooks/user-table-toolbar";

export function UserView() {
  const columns = useColumns();
  const [filterName, setFilterName] = useState("");

  const filteredUsers = _users.filter((user) =>
    user.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const notFound = !filteredUsers.length && !!filterName;

  const { table, pageSize, setPageSize, setPageIndex } = useUsersTable(
    filteredUsers,
    columns
  );

  return (
    <div className="p-6 lg:p-8  min-h-screen">
      <div className="flex items-center justify-between mb-3xl">
        <h1 className="text-3xl font-bold text-primary-darker tracking-tight">
          Users
        </h1>
        <button
          className="px-5 py-2.5 bg-primary text-white text-sm
         font-medium rounded-lg shadow-sm hover:bg-primary-dark
         hover:shadow-md active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New User
        </button>
      </div>

      {/* Search Toolbar */}
      <UserTableToolbar
        filterName={filterName}
        onFilterName={(e) => setFilterName(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-hidden border border-secondary-lighter rounded-xl shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-lighter">
            <thead className="bg-gradient-to-r from-secondary-lighter to-secondary-light/20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-secondary-darker tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-secondary-lighter bg-white">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`transition-all duration-150 ${
                      row.getIsSelected()
                        ? "bg-primary-lighter hover:bg-primary-light/60"
                        : index % 2 === 0
                        ? "bg-white hover:bg-secondary-lighter/30"
                        : "bg-secondary-lighter/10 hover:bg-secondary-light/20"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-secondary-darker whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-12 text-secondary-dark"
                  >
                    {notFound ? (
                      <TableNoData searchQuery={filterName} />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-secondary-light"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>
                        <p className="text-sm font-medium">
                          No users available
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-secondary-lighter/20 border-t border-secondary-lighter">
          <div className="flex items-center gap-2 text-sm text-secondary-dark">
            <span className="font-medium">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-secondary-light rounded-lg px-3 py-1.5 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 cursor-pointer hover:border-secondary"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm text-secondary-dark font-medium">
              {table.getState().pagination.pageIndex * pageSize + 1}–
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * pageSize,
                filteredUsers.length
              )}{" "}
              <span className="text-secondary font-normal">of</span>{" "}
              {filteredUsers.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPageIndex(table.getState().pagination.pageIndex - 1)
                }
                disabled={!table.getCanPreviousPage()}
                className="p-2 border border-secondary-light text-secondary rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-secondary-lighter hover:bg-secondary-lighter hover:border-secondary active:scale-95 transition-all duration-200 bg-white"
                aria-label="Previous page"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  setPageIndex(table.getState().pagination.pageIndex + 1)
                }
                disabled={!table.getCanNextPage()}
                className="p-2 border border-secondary-light text-secondary rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-secondary-lighter hover:bg-secondary-lighter hover:border-secondary active:scale-95 transition-all duration-200 bg-white"
                aria-label="Next page"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

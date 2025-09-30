"use client";

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
    <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Users
          </h1>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all duration-200 flex items-center gap-2">
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
      <div className="overflow-hidden border border-gray-200 rounded-xl shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wider"
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

            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`transition-all duration-150 ${
                      row.getIsSelected()
                        ? "bg-blue-50 hover:bg-blue-100"
                        : index % 2 === 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50/30 hover:bg-gray-100/50"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
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
                    className="text-center py-12 text-gray-500"
                  >
                    {notFound ? (
                      <TableNoData searchQuery={filterName} />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-gray-300"
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
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="font-medium">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:border-gray-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-700 font-medium">
              {table.getState().pagination.pageIndex * pageSize + 1}–
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * pageSize,
                filteredUsers.length
              )}{" "}
              <span className="text-gray-500 font-normal">of</span>{" "}
              {filteredUsers.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPageIndex(table.getState().pagination.pageIndex - 1)
                }
                disabled={!table.getCanPreviousPage()}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-100 hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200 bg-white"
                aria-label="Previous page"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
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
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-100 hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200 bg-white"
                aria-label="Next page"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
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

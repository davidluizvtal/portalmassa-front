/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@components/Button";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ITestResult } from "@shared/interfaces/test-result.interface";
import { RotateCw, Sheet } from "lucide-react";
import React, { useCallback, useEffect } from "react";

interface DynamicTableProps {
  data: ITestResult[];
  onExecute: (data: ITestResult, rerun: boolean) => void;
  exportExcel: (data: ITestResult) => void;
  onPageChange: (newPage: number) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  sorting: { field: string; direction: "asc" | "desc" } | null;
  setSorting: any;
}

const BADGECOLOR = {
  finished: "bg-green-500",
  pending: "bg-yellow-500",
  waiting: "bg-blue-500",
  error: "bg-red-500",
  null: "bg-gray-400",
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  onExecute,
  exportExcel,
  onPageChange,
  currentPage,
  totalItems,
  itemsPerPage,
  sorting,
  setSorting,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > totalPages) {
        return;
      }
      onPageChange(newPage);
    },
    [onPageChange, totalPages]
  );

  useEffect(() => {
    if (sorting) {
      handlePageChange(1);
    }
  }, [sorting, handlePageChange]);

  if (!data.length) {
    return (
      <div className="text-gray-500 py-4 px-4 bg-white shadow-lg rounded-lg">
        Nenhum dado disponível
      </div>
    );
  }

  const disableButton = (status: string): boolean => {
    return status !== null && status !== "finished";
  };

  const handleSort = (field: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sorting && sorting.field === field && sorting.direction === "asc") {
      direction = "desc";
    } else if (!sorting || sorting.field !== field) {
      direction = "asc";
    }

    setSorting({ field, direction });
  };

  const SortArrow: React.FC<{ direction: "asc" | "desc" | null }> = ({
    direction,
  }) => {
    if (!direction) return <span>↓</span>;

    if (direction === "asc") {
      return <span>↑</span>;
    } else {
      return <span>↓</span>;
    }
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("status")}
            />
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Nome do Teste{" "}
              <SortArrow
                direction={
                  sorting && sorting.field === "name" ? sorting.direction : null
                }
              />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("system.name")}
            >
              Sistema{" "}
              <SortArrow
                direction={
                  sorting && sorting.field === "system.name"
                    ? sorting.direction
                    : null
                }
              />
            </th>
            <th
              scope="col"
              className="flex justify-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ação
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((test) => (
            <tr key={test.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div
                    className={`flex-none rounded-full p-1 ${
                      BADGECOLOR[test.result.status]
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full block" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-help">
                {test?.result?.status === "error" ? (
                  <>
                    <HoverCard.Root>
                      <HoverCard.Trigger>{test.name}</HoverCard.Trigger>
                      <HoverCard.Portal>
                        <HoverCard.Content>
                          <div className="bg-gray-300 p-4 max-w-[500px] max-h-[400px] break-words overflow-autop">
                            {test?.result?.error_job}
                          </div>
                          <HoverCard.Arrow />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>
                  </>
                ) : (
                  test.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {test.system.name}
              </td>
              <td className="flex items-end justify-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          className="sm:self-end sm:w-8"
                          onClick={() => exportExcel(test)}
                          disabled={test?.result?.status !== "finished"}
                        >
                          <Sheet />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="TooltipContent"
                          sideOffset={5}
                        >
                          Exportar para Excel
                          <Tooltip.Arrow className="TooltipArrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          className="sm:self-end sm:w-8"
                          onClick={() => onExecute(test, true)}
                          disabled={!test?.result?.status}
                        >
                          <RotateCw />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="TooltipContent"
                          sideOffset={5}
                        >
                          Re-Executar
                          <Tooltip.Arrow className="TooltipArrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
                <div>
                  {
                    <Button
                      className="sm:self-end sm:w-15"
                      onClick={() => onExecute(test, false)}
                      disabled={disableButton(test?.result?.status)}
                      rounded="md"
                      fluid
                    >
                      Executar
                    </Button>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!currentPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Anterior
          </button>

          <div className="text-sm text-gray-700">
            <span className="hidden sm:inline">Página </span>
            <span className="font-medium">{currentPage + 1}</span>
            <span className="hidden sm:inline"> de </span>
            <span className="font-medium">{totalPages}</span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage + 1 === totalPages}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;

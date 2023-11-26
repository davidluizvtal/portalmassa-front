/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogComponent, ParamOnStart } from "@components/Dialog";
import { PulseComponent } from "@components/PulseList";
import DynamicTable from "@components/Table";
import { TTestIdSchema, testIdSchema } from "@core/schemas/Tests.schema";
import { Portal } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getExportExcel,
  getTestsBySystemName,
  runTest,
} from "@pages/TestGeneration/services";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IErrorResponse, apiURL } from "@services/index";
import { ITestResult } from "@shared/interfaces/test-result.interface";
import { ITestParameters } from "@shared/interfaces/tests.interface";
import { useAuth } from "@store/contexts/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import io from "socket.io-client";

const socket = io(apiURL);

export interface SystemsProps {
  name: string;
}

type SortDirection = "asc" | "desc";

export function Systems({ name }: SystemsProps) {
  const [isloading, setLoading] = useState(false);
  const [tests, setTests] = useState<ITestResult[]>([]);
  const [test, setTest] = useState<ITestResult>(null);
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [totalPageIems, setTotalPageItems] = useState(0);
  const [sorting, setSorting] = useState<{
    field: string | null;
    direction: "asc" | "desc";
  } | null>(null);

  const [open, setOpen] = useState(false);
  const [rerun, setReRun] = useState(false);

  const { reset } = useForm<TTestIdSchema>({
    defaultValues: {
      test_id: "",
    },
    resolver: zodResolver(testIdSchema),
  });

  const closeModal = () => {
    setOpen(false);
  };

  const getAll = async (
    page: number,
    sortField: string | null,
    sortDirection: SortDirection
  ) => {
    try {
      const params = {
        ...(page && { page }),
        ...(sortField && { orderByField: sorting?.field }),
        ...(sortDirection && { orderByDirection: sorting?.direction }),
      };

      const { data } = await getTestsBySystemName(name, params);

      const totalItems = data.count;

      setTotalPageItems(totalItems);

      setTests(data.rows || []);
    } catch (err: IErrorResponse | any) {
      toast.error(err.message || "Ocorreu um erro ao buscar os scripts.", {
        duration: 4000,
        position: "top-right",
        icon: "👏",
      });
    } finally {
      setLoading(false);
    }
  };

  const startJob = async ({ params }: ParamOnStart) => {
    try {
      if (!test) {
        toast.success("Selecione um Teste para ser executado", {
          icon: "👏",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
      }
      setOpen(false);
      let payload: ITestParameters[] = [];

      if (params) {
        payload = test.parameters.map((pa, index) => {
          return {
            value: params[index].value,
            field: pa.field,
          } as unknown as ITestParameters;
        });
      }
      let _id = test.id;

      if (rerun) {
        _id = test.result.id;
      }

      const { data } = await runTest(_id, rerun, { parameters: payload });

      const itemIndex = tests.findIndex((test) => test.id === data.test.id);

      if (itemIndex !== -1) {
        tests[itemIndex].result.id = data.id;
        tests[itemIndex].result.status = data.status;
      }

      setTests(tests);

      reset();

      toast.success("Teste iniciado com sucesso!", {
        icon: "👏",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    } catch {
      toast.error(
        "Erro ao tentar iniciado o teste, tente novamente mais tarde!"
      );
    }
  };

  const handleExecute = async (data: ITestResult, rerun: boolean) => {
    setTest(data);
    setReRun(rerun);
    if (rerun) {
      startJob({ params: null });
    } else {
      setOpen(true);
    }
  };

  const handleExportExcel = async (data: ITestResult) => {
    const response = await getExportExcel(data.result.id);

    const contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    const blob = new Blob([response], { type: contentType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    link.download = `${data.name}-massa.xlsx`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setLoading(true);
    getAll(page, sorting?.field, "asc");
  }, [name, page, sorting?.field, sorting?.direction]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    socket.on("events", (data) => {
      if (user.id === data.user_id) {
        const itemIndex = tests.findIndex((test) => test.id === data.test_id);

        if (itemIndex !== -1) {
          tests[itemIndex].result.id = data.result_id;
          tests[itemIndex].result.status = data.status;
          tests[itemIndex].result.build_number = data.buildNumber;
          setTests(tests);
        }
      }
    });

    /*    return () => {
      socket.disconnect();
    }; */
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-yellow-500 mb-4">
        Sistema {name}
      </h1>

      <div>
        {isloading ? (
          <div>
            <PulseComponent className="divide-y divide-gray-100 max-w-3xl rounded-md h-10" />
          </div>
        ) : (
          <DynamicTable
            data={tests}
            currentPage={page}
            totalItems={totalPageIems}
            itemsPerPage={10}
            onPageChange={handlePageChange}
            onExecute={handleExecute}
            exportExcel={handleExportExcel}
            sorting={sorting}
            setSorting={setSorting}
          />
        )}
      </div>
      <div>
        <Portal>
          <DialogComponent
            parameters={test?.parameters}
            open={open}
            onStart={startJob}
            title={test?.name}
            onDismiss={closeModal}
          />
        </Portal>
      </div>
    </div>
  );
}

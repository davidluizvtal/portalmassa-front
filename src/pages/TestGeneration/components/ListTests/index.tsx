/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@components/Button";
import { SelectForm } from "@components/Select";
import Spin from "@components/Spin";
import { getAllTests } from "@pages/TestGeneration/services";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IErrorResponse } from "@services/index";
import { ITest } from "@shared/interfaces/tests.interface";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ListTests() {
  const [tests, setTests] = useState<ITest[]>([]);
  const [isloading, setloading] = useState(false);
  const navigate = useNavigate();

  const getAll = async () => {
    try {
      setloading(true);
      const { data } = await getAllTests();

      setTests(data.rows || []);
    } catch (err: IErrorResponse | any) {
      toast.error(err.message, {
        duration: 4000,
        position: "top-right",
        icon: "👏",
      });
    } finally {
      setloading(false);
    }
  };

  const navCreateTest = () => {
    navigate("create", { state: null });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-vtal-gray-200 text-vtal-gray-800 p-8">
      <div className="text-4xl font-bold text-yellow-500 mb-4">
        Adicionar Novos Testes
      </div>
      <div className="flex items-start justify-start w-full mb-20">
        <Button
          className="bg-vtal-gray-100 hover:bg-vtal-green-50 text-white py-2 px-4 rounded"
          onClick={navCreateTest}
        >
          Novo
        </Button>
      </div>
      {isloading ? <Spin label={""} /> : <SelectForm list={tests} />}
      <Toaster
        toastOptions={{
          style: {
            background: "#vtal-gray-500",
            color: "#vtal-white-100",
          },
          iconTheme: {
            primary: "#vtal-green-100",
            secondary: "#vtal-gray-500",
          },
        }}
      />
    </div>
  );
}

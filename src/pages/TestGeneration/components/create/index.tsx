/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@components/Button";
import FormListbox from "@components/ListBox";
import { PulseComponent } from "@components/PulseList";
import { EFieldsType } from "@core/enums/fields-type.enum";
import { TTestSchema, testSchema } from "@core/schemas/Tests.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTest, getAllSystems } from "@pages/TestGeneration/services";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IErrorResponse } from "@services/index";
import { ISystem } from "@shared/interfaces/system.interface";
import { ITest } from "@shared/interfaces/tests.interface";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function CreateTest() {
  //const navigate = useNavigate();
  const [isloading, setloading] = useState(false);

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    control,
    getValues,
  } = useForm<TTestSchema>({
    defaultValues: {
      name: "",
      system_id: "",
      parameters: [],
    },
    resolver: zodResolver(testSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parameters",
  });

  const [systems, setSystem] = useState<ISystem[]>([]);

  const getSystem = async () => {
    try {
      const { data } = await getAllSystems();

      setSystem(data.rows || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleCreateTest = async (data: ITest) => {
    try {
      setloading(true);

      await createTest(data);
      reset();
      //navigate("/test", { state: null });

      toast.success("Teste criado com sucesso!", {
        icon: "👏",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    } catch {
      toast.error("Erro ao tentar cadastrar um novo teste.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    getSystem();
  }, []);

  useEffect(() => {
    console.log(errors);
    console.log(getValues());
  }, [errors]);

  return (
    <div className="flex justify-center mt-10">
      <form
        className="w-full max-w-2xl p-6 bg-white border border-gray-200 shadow-lg rounded-md"
        onSubmit={handleSubmit(handleCreateTest)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="system"
              className="font-medium text-md text-vtal-gray-800"
            >
              Sistemas
            </label>
            {isloading ? (
              <div className="space-y-2 relative">
                <PulseComponent
                  className="rounded-md py-5 px-4 mr-2"
                  items={[1]}
                />
              </div>
            ) : (
              <>
                <div className="relative">
                  {systems.length ? (
                    <Controller
                      control={control}
                      name="system_id"
                      render={({ field: { value, onChange } }) => (
                        <FormListbox
                          data={systems}
                          value={value}
                          onSelect={(system) => onChange(system.id)}
                        />
                      )}
                    />
                  ) : null}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="font-medium text-md text-vtal-gray-800"
            >
              Nome
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                disabled={isloading}
                placeholder="Digite o nome do teste"
                className="bg-vtal-gray-200 border border-vtal-gray-400 text-vtal-gray-700 placeholder:text-vtal-gray-400 rounded-md py-2 px-4 w-full"
                {...register("name")}
              />
              <span className="text-red-500 text-xs absolute block">
                {errors?.name?.message || ""}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6 divide-y md:gap-3">
            {fields.map((param, index) => {
              return (
                <div
                  key={param.id}
                  className="flex gap-3 items-end flex-col md:flex-row pt-6 md:pt-3"
                >
                  <div className="flex md:grid-cols-2 flex-1 gap-2 items-center">
                    <div className="grid grid-cols-[200px_minmax(200px,_1fr)_110px] gap-4">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor={`${param.id}${index}-field`}
                          className="font-medium text-md text-vtal-gray-800"
                        >
                          Nome
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id={`${param.id}${index}-field`}
                            placeholder="Digite o nome do campo"
                            className="bg-vtal-gray-200 border border-vtal-gray-400 text-vtal-gray-700 placeholder:text-vtal-gray-400 rounded-md py-2 px-4 w-full"
                            {...register(`parameters.${index}.field`)}
                          />
                          {/*  <span className="text-red-500 text-xs absolute block">
                          {errors?.parameters[index]?.field?.message || ""}
                        </span> */}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor={`${param.id}${index}-field`}
                          className="font-medium text-md text-vtal-gray-800"
                        >
                          Valor Default
                        </label>
                        <div className="relative ">
                          <textarea
                            name={`${param.id}${index}-field`}
                            id={`${param.id}${index}-field`}
                            rows={1}
                            placeholder="Digite os as opções"
                            className="bg-vtal-gray-200 resize-none border border-vtal-gray-400 text-vtal-gray-700 placeholder:text-vtal-gray-400 rounded-md py-2 px-4 w-full"
                            {...register(`parameters.${index}.value_default`)}
                          />
                          {/*  <input
                          type="text"
                          id={`${param.id}${index}-field`}
                          placeholder="Digite os as opções"
                          className="bg-vtal-gray-200 border border-vtal-gray-400 text-vtal-gray-700 placeholder:text-vtal-gray-400 rounded-md py-2 px-4 w-full"
                          {...register(`parameters.${index}.field`)}
                        /> */}
                          {/*  <span className="text-red-500 text-xs absolute block">
                          {errors?.parameters[index]?.field?.message || ""}
                        </span> */}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor={`${param.id}${index}-type`}
                          className="font-medium text-md text-vtal-gray-800"
                        >
                          Tipo
                        </label>
                        <Controller
                          control={control}
                          name={`parameters.${index}.type`}
                          render={({ field: { value, onChange } }) => (
                            <FormListbox
                              data={Object.values(EFieldsType).map((type) => ({
                                id: type,
                                name:
                                  type.charAt(0).toUpperCase() + type.slice(1),
                              }))}
                              value={value as EFieldsType}
                              onSelect={(type) =>
                                onChange(type.id as EFieldsType)
                              }
                            />
                          )}
                        />
                        {/* <span className="text-red-500 text-xs absolute block">
                        {errors?.parameters[index]?.type?.message || ""}
                      </span> */}
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <label className="font-medium text-md text-vtal-gray-800"></label>
                      <button
                        className="text-red-500 hover:text-red-600 rounded flex items-center gap-3 p-2"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <span className="md:hidden"> Excluir</span>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-start justify-start mt-6">
          <Button
            className="bg-vtal-gray-100 hover:bg-vtal-green-50 text-white py-2 px-4 rounded"
            type="button"
            disabled={isloading}
            onClick={() => append({ field: "", type: "string" })}
          >
            Adicionar Parâmetro
          </Button>
        </div>
        <div className="flex items-end justify-end mt-6">
          <Button
            className="bg-vtal-gray-100 hover:bg-vtal-green-50 text-white py-2 px-4 rounded"
            type="submit"
            disabled={isSubmitting || isloading}
            loading={isloading}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}

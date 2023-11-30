import { Button } from "@components/Button";
import {
  TParametersSchemaSchema,
  parametersSchema,
} from "@core/schemas/parameters.schema";
import { Listbox, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
interface ParametersDialogProps {
  field: string;
  type: string;
  value_default: string;
}
interface ParametersDialogResponseProps {
  value: string;
}

export interface ParamOnStart {
  params: ParametersDialogResponseProps[];
}

interface DialogProps {
  open: boolean;
  title: string;
  parameters: ParametersDialogProps[];
  onStart: (data: ParamOnStart) => void;
  onDismiss: () => void;
}

const DialogComponent = ({
  open,
  title,
  parameters,
  onStart,
  onDismiss,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!parameters) {
    parameters = [];
  }
  const {
    formState: { isLoading, isSubmitting, isValid },
    register,
    reset,
    handleSubmit,
    control,
  } = useForm<TParametersSchemaSchema>({
    defaultValues: {
      params: [],
    },
    resolver: zodResolver(parametersSchema),
  });

  const closeDialog = () => {
    reset();
    onDismiss();
  };

  useEffect(() => {
    setIsOpen(open);
    reset();
  }, [open, reset]);

  useEffect(() => {
    if (!parameters) {
      parameters = [];
    }
    /*     if (parameters?.type === "select") {
      const steps = parameters?.default_values.split("\n");
      setStepsTest(steps);
    } */
  }, [parameters]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              onClick={closeDialog}
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[90vw] max-w-xl rounded-lg p-4 md:w-full",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <DialogPrimitive.Title className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                {title}
              </DialogPrimitive.Title>
              <div className="mt-2">
                Defina os parâmetros para executar o teste.
              </div>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                <form
                  className="mt-2 space-y-2 max-h-96 overflow-auto"
                  onSubmit={handleSubmit(onStart)}
                >
                  {parameters.map((param, index) => {
                    let steps: string[] = [];

                    if (param.type === "select" && param.value_default) {
                      steps = param.value_default.split("\n");
                    }

                    return (
                      <div key={`${param.field}-${index}`}>
                        <fieldset className="flex-col-2 ">
                          <label
                            htmlFor={param.field}
                            className="text-xs font-medium text-gray-700 dark:text-gray-400"
                          >
                            {param.field.charAt(0).toUpperCase() +
                              param.field.slice(1)}
                          </label>
                          {param.type == "select" ? (
                            <div className="relative">
                              <Controller
                                control={control}
                                name={`params.${index}.value`}
                                render={({ field }) => (
                                  <Listbox
                                    value={field.value}
                                    onChange={field?.onChange}
                                  >
                                    <div className="relative">
                                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                        {field.value || "Selecionar"}
                                      </Listbox.Button>
                                    </div>
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {steps.map((step) => (
                                        <Listbox.Option key={step} value={step}>
                                          {step}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Listbox>
                                )}
                              />
                            </div>
                          ) : (
                            <input
                              id={param.field}
                              type={param.type}
                              placeholder={`Digite o ${
                                param.field.charAt(0).toUpperCase() +
                                param.field.slice(1)
                              }`}
                              {...register(`params.${index}.value`)}
                              autoComplete="given-name"
                              className="bg-vtal-gray-200 border border-vtal-gray-400 text-vtal-gray-700 placeholder:text-vtal-gray-400 rounded-md py-2 px-4 w-full"
                            />
                          )}
                        </fieldset>
                      </div>
                    );
                  })}

                  <div className="mt-4 flex justify-end">
                    <DialogPrimitive.Close asChild>
                      <Button
                        className="bg-vtal-gray-100 hover:bg-vtal-green-50 text-white py-2 px-4 rounded"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        loading={isLoading}
                      >
                        Start
                      </Button>
                    </DialogPrimitive.Close>
                  </div>
                </form>
              </DialogPrimitive.Description>
              <DialogPrimitive.Close
                onClick={closeDialog}
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export { DialogComponent };

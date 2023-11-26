import { Button } from "@components/Button";
import {
  TParametersSchemaSchema,
  parametersSchema,
} from "@core/schemas/parameters.schema";
import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface ParametersDialogProps {
  field: string;
  type: string;
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
    formState: { isLoading, isSubmitting },
    register,
    reset,
    handleSubmit,
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
                    return (
                      <div key={`${param.field}-${index}`}>
                        <fieldset className="flex-col-2 ">
                          {/* <legend>Choose your favorite monster</legend> */}
                          <label
                            htmlFor={param.field}
                            className="text-xs font-medium text-gray-700 dark:text-gray-400"
                          >
                            {param.field.charAt(0).toUpperCase() +
                              param.field.slice(1)}
                          </label>
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
                        </fieldset>
                      </div>
                    );
                  })}

                  <div className="mt-4 flex justify-end">
                    <DialogPrimitive.Close asChild>
                      <Button
                        className="bg-vtal-gray-100 hover:bg-vtal-green-50 text-white py-2 px-4 rounded"
                        type="submit"
                        disabled={isSubmitting}
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

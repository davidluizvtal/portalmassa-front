import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";

export interface IListBox {
  id: string;
  name: string;
}
export interface FormListboxProps {
  data: IListBox[];
  onSelect: (role: IListBox) => void;
  value: string;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FormListbox({
  data,
  value,
  onSelect,
}: FormListboxProps) {
  data = data || [];

  const [selected, setSelected] = useState<IListBox | null>(data[0]);

  const handleChange = (role: IListBox) => {
    onSelect(role);
    setSelected(role);
  };

  useEffect(() => {
    if (value && data.length) {
      const role = data.find((d) => d.id === value);
      setSelected(role);
    } else {
      onSelect(data[0]);
    }
  }, [value, data, selected, onSelect]);

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          {/*  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Perfis
          </Listbox.Label> */}
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {/*   <img
                  src={selected?.avatar}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                /> */}
                <span className="ml-3 block truncate">{selected?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.length
                  ? data.map((item) => (
                      <Listbox.Option
                        key={item?.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              {/* <img
                                src={item?.avatar}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              /> */}
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {item?.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  : null}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

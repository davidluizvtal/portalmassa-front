import { Button } from "@components/Button";
//import FormListbox from "@components/ListBox";
import FormListbox from "@components/ListBox";
import { TUserUpdateSchema, userUpdateSchema } from "@core/schemas/User.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllRoles, getByIdUser, updateUser } from "@pages/User/services";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IErrorResponse } from "@services/index";
import { IRole } from "@shared/interfaces/role.interface";
import { IUsers } from "@shared/interfaces/users.interface";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    formState: { isLoading, isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    setValue,
    control,
  } = useForm<TUserUpdateSchema>({
    defaultValues: {
      id: "",
      username: "",
      password: "",
      email: "",
      role_id: "",
    },
    resolver: zodResolver(userUpdateSchema),
  });

  const [roles, setRoles] = useState<IRole[]>([]);

  const getAllRole = async () => {
    try {
      const { data } = await getAllRoles();

      const listRoles = data.rows.map((role) => ({
        id: role.id,
        name: role.name,
        is_admin: role.is_admin,
      }));
      setRoles(listRoles || []);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: IErrorResponse | any) {
      toast.error(err.message, {
        duration: 4000,
        position: "top-right",
        icon: "👏",
      });
    }
  };

  const getById = async (id: string): Promise<void> => {
    const { data } = await getByIdUser(id);
    setValue("id", data.id);
    setValue("username", data.username);
    setValue("email", data.email);
    setValue("role_id", data.role.id);
  };

  async function handleUpdateUser(data: IUsers) {
    try {
      await updateUser(data.id, data);

      reset();
      navigate("/user", { state: null });

      toast.success("Usuário criado com sucesso!", {
        icon: "👏",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    } catch {
      toast.error("Erro ao tentar cadastrar usuário.");
    }
  }

  useEffect(() => {
    if (location?.state?.id) {
      getById(location.state.id);
    }
  }, [location.state]);

  useEffect(() => {
    getAllRole();
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit(handleUpdateUser)}>
      <div className="grid gap-9 items-center mt-20 sm:grid-cols-2 sm:gap-0 sm:gap-x-0 sm:w-[480px]">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="font-medium text-md text-zinc-800"
          >
            Usuário
          </label>
          <div className="space-y-2 relative">
            <input
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              className="bg-zinc-200 border border-zinc-400 text-zinc-700 placeholder:text-zinc-400 rounded-md py-2 px-4"
              {...register("username")}
            />

            <span className="text-red-500 text-xs absolute block">
              {errors?.username?.message || ""}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="font-medium text-md text-zinc-800"
          >
            Senha
          </label>
          <div className="space-y-2 relative">
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="bg-zinc-200 border border-zinc-400 text-zinc-700 placeholder:text-zinc-400 rounded-md py-2 px-4"
              {...register("password")}
            />

            <span className="text-red-500 text-xs absolute block">
              {errors?.password?.message || ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="font-medium text-md text-zinc-800"
          >
            Email
          </label>
          <div className="space-y-2 relative">
            <input
              type="text"
              id="email"
              placeholder="Digite seu email"
              className="bg-zinc-200 border border-zinc-400 text-zinc-700 placeholder:text-zinc-400 rounded-md py-2 px-4"
              {...register("email")}
            />

            <span className="text-red-500 text-xs absolute block">
              {errors?.email?.message || ""}
            </span>
          </div>
        </div>
        {
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-medium text-md text-zinc-800">
              Perfis
            </label>
            <div className="space-y-2 relative">
              {roles.length ? (
                <Controller
                  control={control}
                  name="role_id"
                  render={({ field: { value, onChange } }) => (
                    <FormListbox
                      data={roles}
                      value={value}
                      onSelect={(role) => onChange(role.id)}
                    />
                  )}
                />
              ) : null}
            </div>
          </div>
        }
      </div>
      <div className="flex items-center justify-center mt-20">
        <Button
          className="sm:self-end sm:w-20"
          type="submit"
          disabled={isSubmitting}
          loading={isLoading}
          rounded="md"
          fluid
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}

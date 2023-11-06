import { Button } from "@components/Button";
import { TUserSchema, userSchema } from "@core/schemas/User.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../store/contexts/auth";

export function Login() {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<TUserSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(userSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleLogin(data: TUserSchema) {
    try {
      setIsLoading(true);

      signIn({
        password: data.password,
        username: data.username,
      }).then(() => setIsLoading(false));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold text-zinc-900 text-center">
          Portal de Massas
        </h1>
        <p className="text-zinc-600 text-center">Faça login para continuar</p>

        <form
          className="w-full sm:w-80 space-y-4 mt-10"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="font-medium text-md text-zinc-800"
            >
              Usuário
            </label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              className="bg-zinc-200 border border-zinc-400 text-zinc-700 placeholder:text-zinc-400 rounded-md py-2 px-4"
              {...register("username")}
            />

            {errors.username && (
              <span className="text-red-500 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-medium text-md text-zinc-800"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="bg-zinc-200 border border-zinc-400 text-zinc-700 placeholder:text-zinc-400 rounded-md py-2 px-4"
              {...register("password")}
            />

            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isLoading}
            rounded="md"
            fluid
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

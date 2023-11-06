import { Button } from "@components/Button";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ListUsers } from "./components/List";

export function User() {
  const navigate = useNavigate();

  const navEditOrCreate = () => {
    navigate("create", { state: null });
  };

  return (
    <div className="w-full items-center justify-center">
      <div className="text-4xl font-bold text-zinc-900 text-left mt-2">
        Usuários do Portal
      </div>
      <div className="flex items-right justify-right mt-20 mb-20">
        <Button
          className="sm:self-end sm:w-20"
          onClick={navEditOrCreate}
          rounded="md"
          fluid
        >
          Novo
        </Button>
      </div>
      <ListUsers />
      <Toaster />
    </div>
  );
}

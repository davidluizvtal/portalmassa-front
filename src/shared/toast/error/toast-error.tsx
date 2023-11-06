import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { FiFrown } from "react-icons/fi"; // Ícone de tristeza do pacote react-icons/fi
interface ShowToastProps {
  message: string;
}
export const showErrorToast = ({ message }: ShowToastProps) => {
  toast(
    <IconContext.Provider value={{ style: { color: "white" } }}>
      <div className="bg-red-500 text-white p-2 rounded flex items-center">
        <FiFrown className="mr-2" />
        {message}
      </div>
    </IconContext.Provider>,
    {
      duration: 4000,
      position: "top-right",
    }
  );
};

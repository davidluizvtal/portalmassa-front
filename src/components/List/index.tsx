import { IUsers } from "@shared/interfaces/users.interface";
import { FileEdit, Trash2 } from "lucide-react";
import userDefaultImg from "../../assets/user-default.png";

export interface ListProps {
  users: IUsers[];
  onEdit: (user: IUsers) => void;
  onDelete: (user_id: string) => void;
}

export default function List({ users, onEdit, onDelete }: ListProps) {
  const disableAction = (user: IUsers): boolean => {
    return user.username.toLocaleLowerCase() === "administrador";
  };
  return (
    <ul role="list" className="divide-y divide-gray-100 max-w-3xl">
      {users.map((user, index) => (
        <li
          key={user.username + index}
          className="flex justify-between gap-x-6 py-5"
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={userDefaultImg}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
                {user.username}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 justify-between">
            <div className="items-left hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900 capitalize">
                {user?.role?.name}
              </p>
              {user?.online ? (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Offline</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(user)}
                  disabled={disableAction(user)}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  <FileEdit className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onDelete(user.id)}
                  disabled={disableAction(user)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import List from "@components/List";
import { PulseComponent } from "@components/PulseList";

import { deleteUser, getAll } from "@pages/User/services";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IErrorResponse } from "@services/index";
import { IUsers } from "@shared/interfaces/users.interface";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ListUsers() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [isloading, setloading] = useState(true);
  const navigate = useNavigate();

  const handleEdit = (user: IUsers): void => {
    navigate("/user/edit", { state: { id: user.id } });
  };

  const getAllUsers = async () => {
    try {
      const { data } = await getAll();

      setUsers(data.rows || []);
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

  const handleDelete = async (user_id: string): Promise<void> => {
    await deleteUser(user_id);
    getAllUsers();
  };

  useEffect(() => {
    setloading(true);
    getAllUsers();
  }, []);

  return (
    <div>
      {isloading ? (
        <div>
          <PulseComponent className="divide-y divide-gray-100 max-w-3xl rounded-md h-10" />
        </div>
      ) : (
        <List users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

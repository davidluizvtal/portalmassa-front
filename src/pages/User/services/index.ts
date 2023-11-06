import { deleteData, getData, getPatch, postData } from "@services/index";
import { DataResponse } from "@shared/interfaces/data-response.interface";
import { PaginationResponse } from "@shared/interfaces/pagination-response.interface";
import { IRole } from "@shared/interfaces/role.interface";
import { IUsers } from "@shared/interfaces/users.interface";

const PATCH = "users";
export const getAll = async (): Promise<
  DataResponse<PaginationResponse<IUsers>>
> => {
  return getData<DataResponse<PaginationResponse<IUsers>>>(`${PATCH}`);
};

export const getByIdUser = async (
  id: string
): Promise<DataResponse<IUsers>> => {
  return getData<DataResponse<IUsers>>(`${PATCH}/${id}`);
};

export const getAllRoles = async (): Promise<
  DataResponse<PaginationResponse<IRole>>
> => {
  return getData<DataResponse<PaginationResponse<IRole>>>("roles");
};

export const updateOnline = async (
  id: string,
  status: boolean
): Promise<void> => {
  getPatch<Partial<IUsers>>(`${PATCH}/online/${id}`, { online: status });
};

export const updateUser = async (id: string, user: IUsers): Promise<void> => {
  getPatch<Partial<IUsers>>(`${PATCH}/${id}`, user);
};

export const deleteUser = async (id: string): Promise<void> => {
  deleteData<void>(`${PATCH}/${id}`);
};

export const createUser = async (data: Partial<IUsers>): Promise<IUsers> => {
  return postData<Partial<IUsers>>(`${PATCH}`, data);
};

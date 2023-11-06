import { IRole } from "./role.interface";

export interface IUsers {
  id: string;
  username: string;
  password: string;
  email: string;
  imageUrl: string;
  online: boolean;
  role: IRole;
}

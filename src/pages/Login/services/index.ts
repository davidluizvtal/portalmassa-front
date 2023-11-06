import { postData } from "@services/index";
interface IResponseLogin {
  data: {
    access_token: string;
  };
}
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<IResponseLogin> => {
  return postData<{
    username: string;
    password: string;
  }>("auth/login", { username, password });
};

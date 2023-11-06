import { errorHandler } from "@services/errorHandler";
import axios, { AxiosError } from "axios";

axios.interceptors.response.use(null, (error: AxiosError) => {
  const { response } = error;

  const expectedErrorLogin =
    response &&
    response.status == 401 &&
    error?.config?.url.includes("auth/login");

  if (expectedErrorLogin) {
    return Promise.reject(errorHandler(response?.data, expectedErrorLogin));
  }

  return Promise.reject(errorHandler(response?.data));
});

export default {
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  post: axios.post,
  delete: axios.delete,
};

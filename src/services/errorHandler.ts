import { IErrorResponse } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, routeAuth = false): IErrorResponse => {
  if (err?.errors.length) {
    for (const error of err.errors) {
      if (error.code == "v-tal/unauthorizedexception" && !routeAuth) {
        //localStorage.clear();
        //window.location.href = "/auth/login";
      }
      return { code: error.code, message: error.detail };
    }
  }
  return {
    code: "500",
    message: "Erro de conexão com a API, tente mais tarde",
  };
};

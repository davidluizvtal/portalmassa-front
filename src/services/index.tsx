/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@services/httpService";

export const apiURL =
  "https://portalmassa-api-pmas-portaldemassas-hml.apps.ocpcorp.vtal.intra/";
//export const apiURL = "http://172.30.147.110:3000/";
//export const apiURL = import.meta.env.VITE_API_URL;

export interface TokenParsed {
  token: string;
}
export interface IErrorResponse {
  code: string;
  message: string;
}

export async function postData<T>(path: RequestInfo | URL, data: T) {
  const res = await http.post(`${apiURL}${path}`, data, {
    headers: Object.assign(getHeaders()),
  });
  return res.data;
}
export async function getData<T>(
  path: RequestInfo | URL,
  queryParams?: Record<string, any>
) {
  const url = new URL(`${apiURL}${path}`);
  if (queryParams) {
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key])
    );
  }

  const res = await http.get<T>(url.toString(), {
    headers: Object.assign(getHeaders()),
  });
  return res.data;
}

export async function getFile<T>(
  path: RequestInfo | URL,
  queryParams?: Record<string, any>
) {
  const url = new URL(`${apiURL}${path}`);
  if (queryParams) {
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key])
    );
  }

  const res = await http.get<T>(url.toString(), {
    headers: Object.assign(getHeaders()),
    responseType: "arraybuffer",
  });
  return res.data;
}
export async function getPatch<T>(path: RequestInfo | URL, data: T) {
  const res = await http.patch<T>(`${apiURL}${path}`, data, {
    headers: Object.assign(getHeaders()),
  });
  return res.data;
}

export async function deleteData<T>(path: RequestInfo | URL) {
  const res = await http.delete<T>(`${apiURL}${path}`, {
    headers: Object.assign(getHeaders()),
  });
  return res.data;
}

const getHeaders = () => {
  const access_token = localStorage.getItem("@vtal:access_token");

  const _headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (access_token) {
    _headers["Authorization"] = `Bearer ${access_token}`;
  }

  return _headers as HeadersInit;
};

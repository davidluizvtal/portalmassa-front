import { getData, postData } from "@services/index";
import { DataResponse } from "@shared/interfaces/data-response.interface";
import { PaginationResponse } from "@shared/interfaces/pagination-response.interface";
import { IPayloadExecuteTest } from "@shared/interfaces/payload-execute-test.interface";
import { ISystem } from "@shared/interfaces/system.interface";
import {
  IRunTestResponse,
  ITestResult,
} from "@shared/interfaces/test-result.interface";
import { ITest } from "@shared/interfaces/tests.interface";

const PATCH = "test";
const PATCH_SYSTEM = "systems";

interface ScriptParams {
  page: number;
  orderByField?: string;
  orderByDirection?: "asc" | "desc";
}

export const getAllTests = async (): Promise<
  DataResponse<PaginationResponse<ITest>>
> => {
  return getData<DataResponse<PaginationResponse<ITest>>>(`${PATCH}`);
};

export const getAllSystems = async (): Promise<
  DataResponse<PaginationResponse<ISystem>>
> => {
  return getData<DataResponse<PaginationResponse<ISystem>>>(`${PATCH_SYSTEM}`);
};

export const getTestsBySystemName = async (
  systemName: string,
  params: ScriptParams
): Promise<DataResponse<PaginationResponse<ITestResult>>> => {
  const { page, orderByField, orderByDirection } = params;

  const queryParams = {
    page,
    ...(orderByField && { orderByField: orderByField }),
    ...(orderByDirection && { orderBy: orderByDirection }),
  };

  try {
    const data = await getData<DataResponse<PaginationResponse<ITestResult>>>(
      `${PATCH}/${PATCH_SYSTEM}/${systemName}`,
      queryParams
    );
    return data;
  } catch (error) {
    console.error("There was an error while fetching the scripts!", error);
    throw error;
  }
};

export const runTest = async (
  test_id: string,
  payload: IPayloadExecuteTest
): Promise<DataResponse<IRunTestResponse>> => {
  return postData<IPayloadExecuteTest>(`${PATCH}/execute/${test_id}`, payload);
};

export const createTest = async (data: Partial<ITest>): Promise<ITest> => {
  return postData<Partial<ITest>>(`${PATCH}`, data);
};

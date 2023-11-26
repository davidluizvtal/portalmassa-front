import { ISystem } from "./system.interface";
import { ITest, ITestParameters } from "./tests.interface";

type TUser = {
  id: string;
  username: string;
  email: string;
};
export interface ITestResult {
  id: string;
  name: string;
  parameters: ITestParameters[];
  user: TUser;
  system: ISystem;
  test: ITest;
  result: {
    build_number: string;
    id: string;
    status: IStatusTestResult;
    result: never;
  };
}
export type IRunTestResponse = Pick<
  ITestResult,
  "id" | "name" | "system" | "test"
> & { status: IStatusTestResult; user: TUser };

export type IStatusTestResult = "pending" | "waiting" | "finished" | "error";

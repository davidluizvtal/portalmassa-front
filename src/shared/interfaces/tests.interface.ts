import { ISystem } from "./system.interface";

export interface ITest {
  id: string;
  name: string;
  system: ISystem;
  result: {
    id: string;
    name: string;
  };
  parameters: ITestParameters[];
}

export interface ITestParameters {
  field: string;
  type: string;
}

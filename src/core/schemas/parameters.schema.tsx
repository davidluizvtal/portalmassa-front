import { z } from "zod";

export const parametersSchema = z.object({
  params: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

export type TParametersSchemaSchema = z.infer<typeof parametersSchema>;

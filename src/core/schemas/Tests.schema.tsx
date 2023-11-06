import { z } from "zod";

export const testSchema = z.object({
  name: z.string(),
  system_id: z.string(),
  parameters: z.array(
    z.object({
      field: z.string(),
      value: z.string(),
      type: z.enum(["string", "number"]),
    })
  ),
});

export const testIdSchema = z.object({
  test_id: z.string(),
});
export type TTestSchema = z.infer<typeof testSchema>;
export type TTestIdSchema = z.infer<typeof testIdSchema>;

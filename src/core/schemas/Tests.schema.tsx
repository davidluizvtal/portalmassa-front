import { z } from "zod";

export const testSchema = z.object({
  name: z.string(),
  system_id: z.string(),
  parameters: z
    .array(
      z.object({
        field: z.string(),
        type: z
          .string()
          .refine(
            (value) =>
              value === "string" || value === "number" || value === "select",
            {
              message: 'Type must be either "string" or "number"',
            }
          ),
        value_default: z.string().optional(),
      })
    )
    .optional(),
});

export const testIdSchema = z.object({
  test_id: z.string(),
});
export type TTestSchema = z.infer<typeof testSchema>;
export type TTestIdSchema = z.infer<typeof testIdSchema>;

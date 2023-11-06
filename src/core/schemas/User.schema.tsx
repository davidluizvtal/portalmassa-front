import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(5, "O usuário deve ter no mínimo 5 caracteres."),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .max(20, "A senha deve ter no máximo 20 caracteres.")
    .refine(
      (value) => {
        return (
          !!value.match(/[a-z]/g) &&
          //!!value.match(/[A-Z]/g) &&
          !!value.match(/[0-9]/g)
        );
      },
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
      }
    ),
});
export const userCreateSchema = userSchema.extend({
  email: z.string(),
  role_id: z.string(),
});
export const userUpdateSchema = userSchema.extend({
  id: z.string(),
  email: z.string().optional(),
  role_id: z.string().optional(),
  username: z
    .string()
    .min(5, "O usuário deve ter no mínimo 5 caracteres.")
    .optional(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .max(20, "A senha deve ter no máximo 20 caracteres.")
    .refine(
      (value) => {
        return (
          !!value.match(/[a-z]/g) &&
          //!!value.match(/[A-Z]/g) &&
          !!value.match(/[0-9]/g)
        );
      },
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
      }
    )
    .optional()
    .or(z.literal("")),
});

export type TUserSchema = z.infer<typeof userSchema>;
export type TUserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type TUserCreateSchema = z.infer<typeof userCreateSchema>;

import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.email().or(z.literal("")).optional(),
  contact: z.string().or(z.literal("")).optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

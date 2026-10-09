import { z } from "zod";

export const packageSchema = z.object({
  client_id: z.uuid(),
  start_date: z.date(),
  due_date: z.date(),
  username: z.string(),
  password: z.string(),
  url: z.string(),
  price: z.number(),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

export const packageUpdateSchema = z.object({
  due_date: z.date(),
  price: z.number(),
});

export type PackageUpdateFormValues = z.infer<typeof packageUpdateSchema>;

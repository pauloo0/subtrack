import { z } from "zod";

export const packageSchema = z.object({
  client_id: z.uuid(),
  start_date: z.date(),
  due_date: z.date(),
  username: z.string(),
  password: z.string(),
  url: z.string(),
  fullurl: z.string(),
  price: z.number(),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

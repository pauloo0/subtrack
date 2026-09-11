import * as z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|<>?,./`~]).+$/;

export const registerSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(12, "A password deve ter no mínimo 12 caracteres")
      .regex(
        passwordRegex,
        "A password deve conter pelo menos uma minúscula, uma maiúscula, um número e um carácter especial.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As passwords não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

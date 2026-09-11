"use server";

import { z } from "zod";
import { registerSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function registerUser(input: unknown) {
  const result = registerSchema.safeParse(input);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      message: "Os dados introduzidos são inválidos.",
      fieldErrors: errors.fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    console.error(error);

    return {
      success: false,
      message: "Não foi possível criar a conta.",
      fieldErrors: {},
    };
  }

  redirect("/login");
}

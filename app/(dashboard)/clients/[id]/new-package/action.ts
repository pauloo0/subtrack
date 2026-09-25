"use server";

import { z } from "zod";
import { packageSchema } from "@/lib/validations/packages";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export async function createClientPackage(input: unknown) {
  const result = packageSchema.safeParse(input);

  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      success: false,
      message: "Os dados introduzidos são inválidos",
      fieldErrors: errors.fieldErrors,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Não autenticado",
      fieldErrors: {},
    };
  }

  const { data, error } = await supabase.from("packages").insert({
    ...result.data,
    start_date: format(result.data.start_date, "yyyyMMdd"),
    due_date: format(result.data.due_date, "yyyyMMdd"),
  });

  if (error) {
    console.error(error);

    return {
      success: false,
      message: "Não consegui criar o pacote.",
    };
  }

  return {
    success: true,
    message: "Pacote criado com sucesso.",
    data: data,
  };
}

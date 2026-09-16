"use server";

import { z } from "zod";
import { clientSchema } from "@/lib/validations/clients";
import { createClient } from "@/lib/supabase/server";

export async function createNewClient(input: unknown) {
  const result = clientSchema.safeParse(input);

  if (!result.success) {
    const errors = z.flattenError(result.error);
    return {
      success: false,
      message: "Os dados introduzidos são inválidos.",
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

  const { data, error } = await supabase.from("clients").insert(result.data);

  if (error) {
    console.error(error);

    return {
      success: false,
      message: "Não consegui criar o cliente.",
    };
  }

  return {
    success: true,
    message: "Cliente criado com sucesso.",
    data: data,
  };
}

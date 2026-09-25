"use server";

import { z } from "zod";
import { clientSchema } from "@/lib/validations/clients";
import { createClient } from "@/lib/supabase/server";

type EditClientProps = {
  id: string;
  input: unknown;
};

export default async function editClient({ id, input }: EditClientProps) {
  const result = clientSchema.safeParse(input);

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

  const { data, error } = await supabase
    .from("clients")
    .update(result.data)
    .eq("id", id);

  if (error) {
    console.error(error);

    return {
      success: false,
      message: "Não consegui atualizar o cliente.",
    };
  }

  return {
    success: true,
    message: "Cliente atualizado com sucesso.",
    data: data,
  };
}

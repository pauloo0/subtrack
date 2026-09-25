"use server";
import { createClient } from "@/lib/supabase/server";
import { addYears, format } from "date-fns";

export async function renewPackage(packageId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Não autenticado",
    };
  }

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("id, due_date")
    .eq("id", packageId)
    .single();

  if (error || !pkg) {
    console.error(error);
    return {
      success: false,
      message: "Não consegui encontrar este pacote",
    };
  }

  if (!pkg.due_date) {
    return {
      success: false,
      message: "Este pacote não tem data de vencimento.",
    };
  }

  const newDueDate = format(addYears(pkg.due_date, 1), "yyyyMMdd");

  const { data, error: updError } = await supabase
    .from("packages")
    .update({
      due_date: newDueDate,
    })
    .eq("id", packageId);

  if (updError) {
    console.error(updError);
    return {
      success: false,
      message: "Não consegui renovar este pacote",
    };
  }

  console.log(data);
  return {
    success: true,
    message: "Pacote renovado com sucesso.",
  };
}

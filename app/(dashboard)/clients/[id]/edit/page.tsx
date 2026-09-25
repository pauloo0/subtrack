import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditClientForm from "./components/edit-client-form";

type ClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClient({ params }: ClientPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !client) {
    notFound();
  }

  return <EditClientForm client={client} />;
}

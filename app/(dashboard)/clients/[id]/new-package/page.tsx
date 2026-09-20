import { notFound } from "next/navigation";
import NewPackageForm from "./components/new-package-form";
import { createClient } from "@/lib/supabase/server";

type NewPackagePageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewPackage({ params }: NewPackagePageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: client, error } = await supabase
    .from("clients")
    .select("id, name")
    .eq("id", id)
    .single();

  if (!id || error) {
    notFound();
  }

  return <NewPackageForm client={client} />;
}

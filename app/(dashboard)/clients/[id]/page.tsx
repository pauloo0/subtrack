import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type ClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: client, error } = await supabase
    .from("clients")
    .select("*, packages (*)")
    .eq("id", id)
    .single();

  if (error || !client) {
    notFound();
  }

  return (
    <div>
      <h1>{client.name}</h1>

      <Link href={`/clients/${id}/new-package`}>
        <Button
          type="button"
          variant="secondary"
          className="w-full cursor-pointer"
        >
          <Plus /> Novo pacote
        </Button>
      </Link>
    </div>
  );
}

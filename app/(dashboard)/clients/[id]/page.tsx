import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AtSign, PencilLineIcon, Phone, Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-row items-center justify-start gap-2">
        <Link href="/clients">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-semibold text-2xl">Página do cliente</h1>
      </div>

      <Card>
        <CardHeader className="text-2xl flex items-center justify-between">
          {client.name}
          <Link href={`/clients/${id}/edit`}>
            <Button type="button" variant="outline" className="cursor-pointer">
              <PencilLineIcon /> Editar cliente
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="text-lg">
          <div className="flex items-center justify-start gap-2">
            <AtSign className="w-4 h-4" />
            {client.email === "" ? "Sem email preenchido" : client.email}
          </div>
          <div className="flex items-center justify-start gap-2">
            <Phone className="w-4 h-4" />
            {client.contact === "" ? "Sem contacto preenchido" : client.contact}
          </div>
        </CardContent>
      </Card>

      <Link href={`/clients/${id}/new-package`} className="w-fit">
        <Button type="button" variant="secondary" className="cursor-pointer">
          <Plus /> Novo pacote
        </Button>
      </Link>

      <DataTable columns={columns} data={client.packages} />
    </div>
  );
}

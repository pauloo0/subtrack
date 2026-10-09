import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

import { createClient } from "@/lib/supabase/server";

export default async function Clients() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    alert(error.message);
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <h1 className="font-semibold text-2xl">Clientes</h1>

      <Link href="clients/new" className="w-fit">
        <Button type="button" variant="secondary" className="cursor-pointer">
          <Plus /> Criar novo
        </Button>
      </Link>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

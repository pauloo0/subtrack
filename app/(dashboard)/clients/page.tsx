import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

import { columns } from "./components/columns";
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
      <h1 className="text-2xl">Clients</h1>

      <Link href="clients/new">
        <Button
          type="button"
          variant="secondary"
          className="w-full cursor-pointer"
        >
          <Plus /> Criar novo
        </Button>
      </Link>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

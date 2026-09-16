import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

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

      <table>
        <thead>
          <tr>
            <th>Nome do cliente</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.contact}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

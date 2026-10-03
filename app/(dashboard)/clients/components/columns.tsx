"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Client = Database["public"]["Tables"]["clients"]["Row"];

const columnHelper = createColumnHelper<DataTableFeatures, Client>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Nome",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("contact", {
    header: "Contacto",
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <Link href={`/clients/${client.id}`}>
          <ChevronRight />
        </Link>
      );
    },
  }),
]);

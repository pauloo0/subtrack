"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

import { ArrowUpDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Client = Database["public"]["Tables"]["clients"]["Row"];

const columnHelper = createColumnHelper<DataTableFeatures, Client>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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

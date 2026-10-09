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
        <div>
          Nome
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <div>
          Email
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("contact", {
    header: ({ column }) => {
      return (
        <div>
          Contacto
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableGlobalFilter: true,
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

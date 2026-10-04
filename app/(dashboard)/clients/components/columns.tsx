"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

import { ArrowUpDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Client = Database["public"]["Tables"]["clients"]["Row"];

const columnHelper = createColumnHelper<DataTableFeatures, Client>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <div>
          <Input
            placeholder="Nome"
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className="max-w-xs"
          />
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <div>
          <Input
            placeholder="Email"
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className="max-w-xs"
          />
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  }),
  columnHelper.accessor("contact", {
    header: ({ column }) => {
      return (
        <div>
          <Input
            placeholder="Contacto"
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className="max-w-xs"
          />
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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

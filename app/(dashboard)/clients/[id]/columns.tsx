"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownActions from "./components/dropdown-actions";

type Package = Database["public"]["Tables"]["packages"]["Row"];

const columnHelper = createColumnHelper<DataTableFeatures, Package>();

export const columns = columnHelper.columns([
  columnHelper.accessor("username", {
    header: ({ column }) => (
      <div>
        <Input
          placeholder="Username"
          value={(column.getFilterValue() as string) ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="max-w-fit"
        />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  }),
  columnHelper.accessor("password", {
    header: ({ column }) => (
      <div>
        <Input
          placeholder="Password"
          value={(column.getFilterValue() as string) ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="max-w-fit"
        />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  }),
  columnHelper.accessor("due_date", {
    header: ({ column }) => (
      <div>
        <Input
          placeholder="Vencimento"
          value={(column.getFilterValue() as string) ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="max-w-fit"
        />
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const pkg = row.original;

      return <DropdownActions pkg={pkg} />;
    },
  }),
]);

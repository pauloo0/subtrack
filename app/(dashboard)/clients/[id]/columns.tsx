"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DropdownActions from "./components/dropdown-actions";
import { differenceInDays, startOfToday } from "date-fns";
import { cn } from "cn";

type Package = Database["public"]["Tables"]["packages"]["Row"];

const columnHelper = createColumnHelper<DataTableFeatures, Package>();

export const columns = columnHelper.columns([
  columnHelper.accessor("username", {
    header: ({ column }) => (
      <div>
        Username
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("password", {
    header: ({ column }) => (
      <div>
        Password
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("due_date", {
    header: ({ column }) => (
      <div>
        Data Venc.
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
  }),
  columnHelper.display({
    id: "due_days",
    header: () => <div className="text-center">Dias Venc.</div>,
    cell: ({ row }) => {
      const today = startOfToday();
      const packageDueDate = row.original.due_date;
      const dueDays = packageDueDate
        ? differenceInDays(packageDueDate, today)
        : 0;

      return (
        <div
          className={cn(
            "text-center",
            dueDays <= 7 && "text-amber-500",
            dueDays <= 0 && "text-red-500",
          )}
        >
          {dueDays}
        </div>
      );
    },
  }),
  columnHelper.accessor("price", {
    header: ({ column }) => (
      <div className="text-right">
        Preço
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div className="text-right">{formatted}</div>;
    },
    enableGlobalFilter: true,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const pkg = row.original;

      return (
        <div className="text-right">
          <DropdownActions pkg={pkg} />
        </div>
      );
    },
  }),
]);

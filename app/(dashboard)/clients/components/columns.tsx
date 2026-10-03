"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

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
]);

"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/data-table-features";
import { type Database } from "@/types/supabase";

import {
  ArrowUpDown,
  CopyIcon,
  KeyRoundIcon,
  LinkIcon,
  MoreHorizontal,
  RotateCwIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { renewPackage } from "./actions";
import { useRouter } from "next/navigation";

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
          className="max-w-xs"
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
          className="max-w-xs"
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
          className="max-w-xs"
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

      const copyData = (type: "user" | "pass" | "url" | "full") => {
        let copyItem: string | null = "";

        switch (type) {
          case "user":
            copyItem = pkg.username;
            break;
          case "pass":
            copyItem = pkg.password;
            break;
          case "url":
            copyItem = pkg.url;
            break;
          case "full":
            copyItem = pkg.fullurl;
            break;
        }

        if (!copyItem) {
          alert("Não tenho essa informação para copiar.");
        }

        navigator.clipboard.writeText(copyItem!);
      };

      const handleRenew = async () => {
        const result = await renewPackage(pkg.id);

        if (!result.success) {
          console.error(result);
          alert(result.message);
          return;
        }

        alert(result.message);
        window.location.reload();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CopyIcon className="mr-2 w-4 h-4" /> Copiar
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => copyData("user")}>
                    <UserIcon className="mr-2 w-4 h-4" /> Utilizador
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => copyData("pass")}>
                    <KeyRoundIcon className="mr-2 w-4 h-4" /> Password
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => copyData("url")}>
                    <LinkIcon className="mr-2 w-4 h-4" /> Link base
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => copyData("full")}>
                    <LinkIcon className="mr-2 w-4 h-4" /> Link completo
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleRenew}>
              <RotateCwIcon className="mr-2 w-4 h-4" /> Renovar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);

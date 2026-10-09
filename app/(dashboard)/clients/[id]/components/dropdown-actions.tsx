"use client";

import { useState } from "react";

import {
  CopyIcon,
  KeyRoundIcon,
  LinkIcon,
  MoreHorizontal,
  PencilLineIcon,
  RotateCwIcon,
  UserIcon,
} from "lucide-react";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { renewPackage } from "../actions";
import UpdatePackageForm from "./update-package";

import { Database } from "@/types/supabase";
import { Field } from "@/components/ui/field";

type Package = Database["public"]["Tables"]["packages"]["Row"];

type DropdownActionsProps = {
  pkg: Package;
};

export default function DropdownActions({ pkg }: DropdownActionsProps) {
  const [editOpen, setEditOpen] = useState(false);

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-8 w-8 p-0" />}
        >
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
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <PencilLineIcon className="mr-2 w-4 h-4" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleRenew}>
            <RotateCwIcon className="mr-2 w-4 h-4" /> Renovar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <UpdatePackageForm packageId={pkg.id} setEditOpen={setEditOpen} />
          <DialogFooter>
            <Field orientation="horizontal">
              <Button type="submit" form="update-package-form">
                Gravar
              </Button>
              <Button
                type="reset"
                variant="outline"
                onClick={() => setEditOpen(false)}
              >
                Cancelar
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

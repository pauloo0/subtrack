"use client";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { differenceInDays, format, startOfToday } from "date-fns";
import { CopyIcon, PencilLineIcon, RotateCwIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { renewPackage } from "../actions";
import { useRouter } from "next/navigation";

type Package = Database["public"]["Tables"]["packages"]["Row"];

type PackageTableProps = {
  packages: Package[];
};

export default function PackageTable({ packages }: PackageTableProps) {
  const router = useRouter();

  const copyToClipboard = (fullUrl: string | null) => {
    if (!fullUrl) {
      alert("Não tem link para copiar.");
      return;
    }
    navigator.clipboard.writeText(fullUrl);
  };

  const handleRenew = async (id: string) => {
    const result = await renewPackage(id);

    if (!result.success) {
      console.error(result);
      alert(result.message);
      return;
    }

    alert(result.message);
    router.refresh();
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Vencimento</th>
          <th>Dias</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {packages.length > 0 ? (
          packages.map((pkg) => {
            const daysToDue = pkg.due_date
              ? differenceInDays(pkg.due_date, startOfToday())
              : 0;

            return (
              <tr key={pkg.id}>
                <td>{pkg.username}</td>
                <td>{pkg.password}</td>
                <td>
                  {pkg.due_date
                    ? format(pkg.due_date, "dd/MM/yyyy")
                    : "Sem vencimento"}
                </td>
                <td
                  className={cn(
                    daysToDue < 0 && "text-red-500",
                    daysToDue >= 0 && daysToDue <= 15 && "text-amber-500",
                  )}
                >
                  {daysToDue}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => copyToClipboard(pkg.fullurl)}
                    className="cursor-pointer"
                  >
                    <CopyIcon />
                  </Button>
                  <Button type="button" variant="link">
                    <Link href={`/packages/${pkg.id}/edit`}>
                      <PencilLineIcon />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => handleRenew(pkg.id)}
                  >
                    <RotateCwIcon />
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>Sem pacotes</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

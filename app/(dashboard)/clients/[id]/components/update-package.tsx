"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  packageUpdateSchema,
  PackageUpdateFormValues,
} from "@/lib/validations/packages";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import CalendarPicker from "@/components/calendar-picker";
import { startOfToday } from "date-fns";
import { updateClientPackage } from "../actions";

interface UpdatePackageFormProps {
  packageId: string;
  setEditOpen: React.Dispatch<boolean>;
}

export default function UpdatePackageForm({
  packageId,
  setEditOpen,
}: UpdatePackageFormProps) {
  const formDefaults = {
    due_date: startOfToday(),
    price: 40,
  };

  const form = useForm<PackageUpdateFormValues>({
    resolver: zodResolver(packageUpdateSchema),
    defaultValues: formDefaults,
  });

  const onSubmit = async (data: PackageUpdateFormValues) => {
    const result = await updateClientPackage(packageId, data);

    alert(result.message);
    if (result.success) {
      setEditOpen(false);
    }
  };

  return (
    <form
      id="update-package-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="due_date"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="due_date">Data de vencimento</FieldLabel>
            <CalendarPicker
              value={field.value}
              onChange={field.onChange}
              emptyText="Escolhe a data de vencimento"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="price">Valor do pacote</FieldLabel>
            <Input
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              id="price"
              type="number"
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}

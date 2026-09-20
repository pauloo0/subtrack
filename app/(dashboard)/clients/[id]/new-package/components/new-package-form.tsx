"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { packageSchema, PackageFormValues } from "@/lib/validations/packages";
import { redirect } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addYears, startOfToday } from "date-fns";
import { Database } from "@/types/supabase";
import { createClientPackage } from "../action";
import CalendarPicker from "@/components/calendar-picker";

type Client = Pick<
  Database["public"]["Tables"]["clients"]["Row"],
  "id" | "name"
>;

type NewPackageFormProps = {
  client: Client;
};

export default function NewPackageForm({ client }: NewPackageFormProps) {
  const formDefaults = {
    client_id: client.id.toString(),
    start_date: startOfToday(),
    due_date: addYears(startOfToday(), 1),
    url: "http://wh.gktxp.com:8080",
    username: "",
    password: "",
    fullurl:
      "http://wh.gktxp.com:8080/get.php?username={USERNAME}&password={PASSWORD}&type=m3u_plus&output=mpegs",
    price: 40,
  };

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: formDefaults,
  });

  const onSubmit = async (data: PackageFormValues) => {
    const result = await createClientPackage(data);

    if (!result.success) {
      alert(result.message);
    }
    redirect(`/clients/${client.id}`);
  };

  const onCancel = () => {
    if (confirm("Tem a certeza que quer cancelar?")) {
      form.reset();
      redirect(`/clients/${client.id}`);
    }
  };

  return (
    <Card className="w-3/4 md:w-1/2 mx-auto">
      <CardContent>
        <form
          id="new-package-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <h1>{client.name}</h1>
          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="url">Url base</FieldLabel>
                <Input
                  {...field}
                  id="url"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="username">Utilizador</FieldLabel>
                <Input
                  {...field}
                  id="username"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  onBlur={(e) => form.setValues({})}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="fullurl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="fullurl">Url completo</FieldLabel>
                <Input
                  {...field}
                  id="fullurl"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="start_date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="start_date">Data de início</FieldLabel>
                <CalendarPicker
                  value={field.value}
                  onChange={field.onChange}
                  emptyText="Escolhe a data de início"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="new-package-form">
            Gravar
          </Button>
          <Button type="reset" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

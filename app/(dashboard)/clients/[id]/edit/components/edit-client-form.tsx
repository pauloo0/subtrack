"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientFormValues } from "@/lib/validations/clients";
import { redirect } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Database } from "@/types/supabase";
import editClient from "../actions";

type Client = Database["public"]["Tables"]["clients"]["Row"];

type EditClientFormProps = {
  client: Client;
};

export default function EditClientForm({ client }: EditClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client.name,
      email: client.email,
      contact: client.contact,
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    const result = await editClient({ id: client.id, input: data });

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
          id="edit-client-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Nome do cliente <span className="text-amber-400">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email do cliente</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
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
            name="contact"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact">Contacto do cliente</FieldLabel>
                <Input
                  {...field}
                  id="contact"
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
          <Button type="submit" form="edit-client-form">
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

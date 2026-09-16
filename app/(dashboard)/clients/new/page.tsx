"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientFormValues } from "@/lib/validations/clients";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { createNewClient } from "./actions";
import { redirect } from "next/navigation";

export default function NewClient() {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    const result = await createNewClient(data);

    if (!result.success) {
      alert(result.message);
    }
    redirect("/clients");
  };

  const formValues = useWatch({ control: form.control });

  const onCancel = () => {
    const hasData = Object.values(formValues).some(
      (value) => value !== undefined && value !== null && value !== "",
    );

    if (hasData && confirm("Tem a certeza que quer cancelar?")) {
      form.reset();
      redirect("/clients");
    }
    if (!hasData) {
      form.reset();
      redirect("/clients");
    }
  };

  return (
    <Card className="w-1/3">
      <CardContent>
        <form
          id="new-client-form"
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
          <Button type="submit" form="new-client-form">
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

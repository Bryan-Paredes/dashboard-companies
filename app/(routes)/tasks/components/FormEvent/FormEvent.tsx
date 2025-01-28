"use client";

import { Button } from "@/components/ui/button";
import { FormEventProps } from "./formEvent.types";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormDescription,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  eventName: z.string().min(2),
  companySelected: z.object({
    id: z.string(),
    name: z.string().min(2),
  }),
});

export default function FormEvent(props: FormEventProps) {
  const { companies, setNewEvent, setOpen, setOnSaveNewEvent } = props;
  const [selectedCompany, setSelectedCompany] = useState({
    name: "",
    id: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      companySelected: {
        id: "",
        name: "",
      },
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setNewEvent(data);
    setOpen(false);
    setOnSaveNewEvent(true);
  };

  const handleCompanyChange = (newValue: string) => {
    const selectedCompany = companies.find(
      (company) => company.name === newValue
    );
    if (selectedCompany) {
      setSelectedCompany({
        name: selectedCompany.name,
        id: selectedCompany.id,
      });
      form.setValue("companySelected.name", selectedCompany?.name);
      form.setValue("companySelected.id", selectedCompany?.id);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Meeting..." {...field} />
              </FormControl>
              <FormDescription>Introduce el nombre del evento</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companySelected.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <Select
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                  handleCompanyChange(newValue);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                  {selectedCompany.name}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Evento</Button>
      </form>
    </Form>
  );
}

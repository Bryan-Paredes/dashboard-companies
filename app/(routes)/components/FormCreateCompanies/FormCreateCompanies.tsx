"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreateCustomerProps } from "./formCreateCustomer.types";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  website: z.string(),
  phone: z.string().min(6).max(8),
  cif: z.string().min(6),
  profileImage: z.string(),
  description: z.string(),
});

export default function FormCreateCompanies(props: FormCreateCustomerProps) {
  const { toast } = useToast();

  const { setOpenModalCreate } = props;
  const router = useRouter();

  const [photoUpload, setPhotoUpload] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      website: "",
      phone: "",
      cif: "",
      profileImage: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.post("/api/company", values);
      toast({ title: "Company Created", color: "green" });
      router.refresh();
      setOpenModalCreate(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
          description: error.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company Name ..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Guatemala">Guatemala</SelectItem>
                    <SelectItem value="Honduras">Honduras</SelectItem>
                    <SelectItem value="Mexico">Mexico</SelectItem>
                    <SelectItem value="San Salvador">San Salvador</SelectItem>
                    <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="www.example.com" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="12345678" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIF</FormLabel>
                <FormControl>
                  <Input placeholder="1-2345678" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={() => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  {photoUpload ? (
                    <p className="text-sm text-green-700">
                      Image Uploaded Successfully!
                    </p>
                  ) : (
                    <UploadButton
                      className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                      endpoint="profileImage"
                      onClientUploadComplete={(res) => {
                        form.setValue("profileImage", res?.[0]?.url);
                        toast({
                          title: "Image Uploaded Successfully",
                          color: "green",
                        });
                        setPhotoUpload(true);
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          title: "Error Uploading Image",
                          variant: "destructive",
                          description: error.message,
                        });
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full"
                    placeholder="Description ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

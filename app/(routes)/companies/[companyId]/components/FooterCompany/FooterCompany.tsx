"use client";

import { FooterCompanyProps } from "./footerCompany.types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function FooterCompany(props: FooterCompanyProps) {
  const { companyId } = props;
  const router = useRouter();

  const onDeleteCompany = async () => {
    try {
      await axios.delete(`/api/company/${companyId}`);
      toast({
        title: "Company Deleted",
        color: "green",
      });
      router.push("/companies");
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
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={onDeleteCompany}>
        <Trash className="mr-2 h-4 w-4" />
        Delete Company
      </Button>
    </div>
  );
}

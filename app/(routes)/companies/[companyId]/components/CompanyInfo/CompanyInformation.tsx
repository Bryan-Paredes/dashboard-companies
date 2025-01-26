import { User } from "lucide-react";
import { CompanyInformationProps } from "./companyInfo.types";
import Image from "next/image";
import CompanyForm from "../CompanyForm/CompanyForm";
import NewContact from "../NewContact/NewContact";
import ListContact from "../ListContact/ListContact";

export default function CompanyInformation(props: CompanyInformationProps) {
  const { company } = props;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div className="flex items-center justify-center my-4">
          <Image
            src={company.profileImage}
            alt="Company Profile Image"
            width={200}
            height={200}
            className="rounded-lg mb-3"
          />
        </div>
        <CompanyForm company={company} />
      </div>
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2">
            <User className="h-5 w-5" />
            Contacts
          </div>
          <div>
            <NewContact />
          </div>
        </div>
        <ListContact company={company} />
      </div>
    </div>
  );
}

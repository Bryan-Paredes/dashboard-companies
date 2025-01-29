import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "./components/Header/Header";
import CompanyInformation from "./components/CompanyInfo/CompanyInformation";
import FooterCompany from "./components/FooterCompany/FooterCompany";

export default async function CompanyIdPage({
  params,
}: {
  params: { companyId: string };
}) {
  const { companyId } = params;
  const userId = (await auth()).userId;

  if (!userId) return redirect("/");

  const company = await db.company.findUnique({
    where: {
      id: companyId,
      userId,
    },
  });

  if (!company) return redirect("/");

  return (
    <div>
      <Header />
      <CompanyInformation company={company} />
      <FooterCompany companyId={companyId} />
    </div>
  );
}

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ListContactProps } from "./listContact.types";
import { auth } from "@clerk/nextjs/server";
import { Contact } from "@prisma/client";

export default async function ListContact(props: ListContactProps) {
  const { company } = props;
  const userId = (await auth()).userId;

  if (!userId) return redirect("/");

  const contacts = await db.contact.findMany({
    where: {
      company: {
        id: company.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (contacts.length === 0) {
    return <p>Actualmente no hay contactos en esta empresa</p>;
  }

  return (
    <div className="">
      <div className="mt-4 mb-2 grid grid-cols-3 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 rounded-lg">
        <p>Name</p>
        <p>Role</p>
        <p className="text-right">Contact</p>
      </div>
      {contacts.map((contact: Contact) => (
        <div key={contact.id}>
          <div className="grid grid-cols-3 gap-x-3 items-center justify-between px-4">
            <p>{contact.name}</p>
            <p>{contact.role}</p>
            <div className="flex items-center gap-x-6 justify-end">
              <a
                href={`telto:${contact.phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  );
}

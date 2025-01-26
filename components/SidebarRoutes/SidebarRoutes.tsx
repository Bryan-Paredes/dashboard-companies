"use client";

import SidebarItems from "@/components/SidebarItems/SidebarItems";
import {
  dataGeneralSidebar,
  dataSupportSidebar,
  dataToolsSidebar,
} from "./SidebarRoutes.data";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";

export default function SidebarRoutes() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">General</p>
          {dataGeneralSidebar.map(({ icon, label, href }) => (
            <SidebarItems key={label} item={{ label, icon, href }} />
          ))}
        </div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">Tools</p>
          {dataToolsSidebar.map(({ icon, label, href }) => (
            <SidebarItems key={label} item={{ label, icon, href }} />
          ))}
        </div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">Support</p>
          {dataSupportSidebar.map(({ icon, label, href }) => (
            <SidebarItems key={label} item={{ label, icon, href }} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-center p-6">
          <Button variant="outline" className="w-full">
            Upgrade Plan
          </Button>
        </div>
        <Separator className="bg-slate-300" />
        <footer className="mt-3 p-3 text-center">
          <p>© {year} All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}

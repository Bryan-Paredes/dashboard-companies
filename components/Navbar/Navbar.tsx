import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SidebarRoutes from "@/components/SidebarRoutes/SidebarRoutes";
import ModeToggle from "@/components/toggle-theme";

export default function Navbar() {
  return (
    <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex flex-col items-center">
            <Menu />
            <SheetTitle className="text-xs">Menu</SheetTitle>
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative w-[300px]">
        <Input placeholder="Search..." className="rounded-lg" />
        <Search strokeWidth={1} className="absolute top-2 right-2" />
      </div>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

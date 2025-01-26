import SidebarRoutes from "@/components/SidebarRoutes/SidebarRoutes";
import Logo from "@/components/Logo/Logo";

export default function SideBar() {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col border-r">
        <Logo />
        <SidebarRoutes />
      </div>
    </div>
  );
}

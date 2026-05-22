import { Outlet } from "react-router";
import { BackofficeSidebar } from "./BackofficeSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function BackofficeLayout() {
  return (
    <SidebarProvider>
      <BackofficeSidebar />

      <SidebarInset className="flex socially-app-shell min-w-0 flex-1 flex-col overflow-y-auto">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

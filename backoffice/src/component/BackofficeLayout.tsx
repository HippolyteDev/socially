import { Outlet } from "react-router";
import { BackofficeSidebar } from "./BackofficeSidebar";

export function BackofficeLayout() {
  return (
    <div className="socially-app-shell flex min-h-svh">
      <BackofficeSidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

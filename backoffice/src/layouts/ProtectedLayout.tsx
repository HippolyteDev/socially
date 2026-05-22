import { ShieldCheck } from "lucide-react";
import { authClient } from "../lib/authClient";
import { Navigate, Outlet } from "react-router";

export function ProtectedLayout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-2 border-zinc-800 border-t-zinc-400 animate-spin" />
          <ShieldCheck className="absolute h-5 w-5 text-zinc-400 animate-pulse" />
        </div>
        <p className="text-sm font-medium text-zinc-500 tracking-wide">
          Sécurisation de la session...
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

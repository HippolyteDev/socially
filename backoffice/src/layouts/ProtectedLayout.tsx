import { ShieldCheck } from "lucide-react";
import { authClient } from "../lib/authClient";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

export function ProtectedLayout() {
  const [staffStatus, setStaffStatus] = useState<
    "checking" | "authorized" | "unauthorized" | "error"
  >("checking");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    async function checkStaff() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/staff/me`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          setStaffStatus("authorized");
          return;
        }

        if (response.status === 401 || response.status === 403) {
          setStaffStatus("unauthorized");
          return;
        }

        if (isPending || !session) return;

        setStaffStatus("error");
      } catch {
        setStaffStatus("error");
      }
    }

    checkStaff();
  }, [isPending, session]);

  if (isPending || staffStatus === "checking") {
    return (
      <div className="flex flex-col justify-center items-center">
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

  if (!session || staffStatus === "unauthorized") {
    return <Navigate to="/" replace />;
  }

  if (staffStatus === "error") {
    return (
      <p className="flex flex-col items-centers justify-center">
        Erreur serveur
      </p>
    );
  }

  return (
    <div className="">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

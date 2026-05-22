import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardPage() {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  useEffect(() => {
    const bootstrapOwner = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bootstrap-owner`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await res.json();
      if (result.status === 409) {
        setErrMsg("Un owner existe déjà");
      }
      if (!result.ok) {
        setErrMsg(result.error ?? "Erreur lors de la connextion au serveur");
      }

      setIsLoading(false);
    };

    bootstrapOwner();
  }, []);
  return (
    <main className="flex flex-col justify-center items-center">
      Dashboard
      <p className="text-destructive">{errMsg}</p>
      {loading && (
        <LoaderCircle className="ml-75 absolute size-6 animate-spin" />
      )}
    </main>
  );
}

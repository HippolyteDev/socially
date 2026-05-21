import "./App.css";
import sociallyWhiteLogo from "./assets/socially_white.png";
import { ShieldCheck } from "lucide-react";

function App() {
  return (
    <main className="flex justify-center items-center min-h-screen ">
      <article className="flex flex-col  rounded-2xl shadow items-center bg-card w-full max-w-[450px] min-h-[500px] ">
        <img
          src={sociallyWhiteLogo}
          alt="logo"
          //Décode l'image en tâche de fond pour ne pas bloquer le thread principal
          decoding="async"
          className="mt-10 h-30  w-auto object-contain"
        />
        <h1 className="text-3xl font-bold text-center">Accès au backoffice</h1>
        <p className="text-sm leading-5 text-muted-foreground mb-1">
          Accès sécurisé au backoffice de Socially
        </p>
        <div className="mt-3 mx-auto h-px w-14 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_rgba(10,132,255,0.75)]" />
        <button className="bg-transparent mt-5 p-4 border border-1 rounded-sm cursor-pointer  border-ring">
          Connectez-vous avec Microsoft
        </button>
        <div className="flex flex-row mt-10 items-center gap-2 ">
          <ShieldCheck className="size-7 text-muted-foreground" />
          <div className="">
            <p className=" text-muted-foreground text-sm">
              Authentification sécurisée avec Microsoft
            </p>
            <p className="text-muted-foreground text-sm">
              Tout accèes et tracée et sécurisée
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default App;

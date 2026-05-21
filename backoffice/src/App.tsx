import "./App.css";
import sociallyWhiteLogo from "./assets/socially_white.png";
import { ShieldCheck } from "lucide-react";

function App() {
  return (
    <main className="flex justify-center items-center min-h-screen ">
      <article
        className="flex flex-col  rounded-2xl shadow items-center bg-card w-full max-w-[450px] min-h-[500px] border border-white/10
shadow-[0_24px_80px_rgba(0,0,0,0.45)] "
      >
        <img
          src={sociallyWhiteLogo}
          alt="logo"
          //Décode l'image en tâche de fond pour ne pas bloquer le thread principal
          decoding="async"
          className="mt-10 h-35 w-auto object-contain"
        />
        <h1 className="text-3xl font-bold text-center">Accès au backoffice</h1>
        <p className="text-sm leading-5 text-muted-foreground mb-1">
          Accès sécurisé au backoffice de Socially
        </p>
        <div className="mt-10 mx-auto h-px w-14 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_rgba(10,132,255,0.75)]" />
        <button className="bg-transparent font-semibold mt-5 p-4 inline-flex gap-2 rounded-sm transition-all duration-200 ease-out cursor-pointer hover:bg-primary/10 hover:shadow-[0_0_32px_rgba(10,132,255,0.42)] shadow-[0_0_24px_rgba(10,132,255,0.28)] border border-primary/80 bg-transparent ">
          <span className="grid size-5 grid-cols-2 gap-0.5">
            <span className="bg-[#f25022]" />
            <span className="bg-[#7fba00]" />
            <span className="bg-[#00a4ef]" />
            <span className="bg-[#ffb900]" />
          </span>
          Connectez-vous avec Microsoft
        </button>
        <div className="flex flex-row mt-20 items-center gap-2 ">
          <ShieldCheck className="size-7 text-muted-foreground" />
          <div className="">
            <p className=" text-muted-foreground text-sm">
              Authentification sécurisée avec Microsoft
            </p>
            <p className="text-muted-foreground text-sm">
              Tout accès est tracé et sécurisé{" "}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default App;

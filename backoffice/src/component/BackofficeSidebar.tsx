import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import sociallyWhiteLogo from "../assets/socially_white.png";
import { Link } from "react-router";

export function BackofficeSidebar() {
  return (
    <Sidebar className="sticky top-0 border-white/6 bg-[#17181d]">
      <SidebarHeader className="px-6 mb-4 mt-3">
        <Link
          to="/dashboard"
          className="block hover:opacity-80 transition-opacity"
          aria-label="aller au tableau debord"
        >
          <img
            src={sociallyWhiteLogo}
            alt="logo"
            //Décode l'image en tâche de fond pour ne pas bloquer le thread principal
            decoding="async"
            className="mt-10 h-35 w-auto object-contain"
          />
        </Link>
      </SidebarHeader>
    </Sidebar>
  );
}

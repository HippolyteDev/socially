import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import sociallyWhiteLogo from "../assets/socially_white.png";
import { Link } from "react-router";
import {
  FileText,
  LayoutDashboard,
  List,
  Settings,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

const navLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    to: "/users",
    icon: User,
  },
  {
    label: "Content",
    to: "/content",
    icon: FileText,
  },
  {
    label: "Moderation",
    to: "/moderation",
    icon: ShieldCheck,
  },
  {
    label: "Tracking",
    to: "/tracking",
    icon: TrendingUp,
  },
  {
    label: "Logs",
    to: "/logs",
    icon: List,
  },
  {
    label: "Staff",
    to: "/staff",
    icon: Users,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
] as const;

export function BackofficeSidebar() {
  return (
    <Sidebar className="sticky top-0 border-r border-sidebar-border bg-sidebar ">
      <SidebarHeader className="px-6 flex items-center">
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
            className=" h-24 flex items-cen self-center w-auto object-contain"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-5 ">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    className="h-11 gap-3 rounded-lg px-4 text-sm font-medium text-sidebar-foreground/80 [&_svg]:size-5"
                    size="lg"
                  >
                    <Link to={item.to}>
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

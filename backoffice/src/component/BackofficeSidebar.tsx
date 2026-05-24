import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import sociallyWhiteLogo from "../assets/socially_white.png";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ChevronsUpDown,
  CircleUserRound,
  FileText,
  LayoutDashboard,
  List,
  LogOut,
  Settings,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/authClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const staffName = session?.user.name ?? "Staff";
  const staffEmail = session?.user.email ?? "Backoffice";
  const staffImage = session?.user.image;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => navigate("/"),
      },
    });
  };

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
              const isActive =
                location.pathname === item.to ||
                location.pathname.startsWith(`${item.to}/`);

              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="h-11 gap-3 rounded-lg px-4 text-sm font-medium text-sidebar-foreground/80 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-[var(--socially-blue-glow)] [&_svg]:size-5"
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
      <SidebarFooter className="px-4 pb-5 pt-4">
        <Separator className="bg-white/6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring/60 data-[state=open]:bg-sidebar-accent"
            >
              {staffImage ? (
                <img
                  src={staffImage}
                  alt={staffName}
                  className="size-10 rounded-lg object-cover ring-1 ring-white/10"
                />
              ) : (
                <span
                  className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-secondary text-sidebar-foreground"
                  aria-hidden="true"
                >
                  <CircleUserRound className="size-5" />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-white">
                  {staffName}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {staffEmail}
                </span>
              </span>
              <ChevronsUpDown className="size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-56 border-sidebar-border bg-popover"
          >
            <DropdownMenuLabel>
              <span className="block truncate text-sm font-semibold">
                {staffName}
              </span>
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {staffEmail}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              onSelect={handleLogout}
            >
              <LogOut className="size-4" />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

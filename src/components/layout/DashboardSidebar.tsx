import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Settings,
  Home,
  ChevronRight,
  Building
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Ingresos", url: "/ingresos", icon: TrendingUp },
  { title: "Gastos", url: "/gastos", icon: TrendingDown },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Proveedores", url: "/proveedores", icon: Building2 },
];

const managementItems = [
  { title: "Usuarios", url: "/usuarios", icon: Users },
  { title: "Ajustes", url: "/ajustes", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const active = isActive(path);
    return `relative w-full justify-start gap-3 px-3 py-2.5 transition-all duration-fast hover:bg-sidebar-accent ${
      active 
        ? "bg-sidebar-accent text-sidebar-primary font-medium" 
        : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
    }`;
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Building className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">FinanzasApp</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>

        {/* Navegación Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {isActive(item.url) && (
                            <ChevronRight className="w-4 h-4 text-primary" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Gestión */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Gestión
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {isActive(item.url) && (
                            <ChevronRight className="w-4 h-4 text-primary" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Trigger para colapsar sidebar */}
      <div className="absolute top-4 -right-3 z-10">
        <SidebarTrigger className="bg-background border border-border rounded-full w-6 h-6 p-0 shadow-sm hover:shadow-md transition-shadow" />
      </div>
    </Sidebar>
  );
}
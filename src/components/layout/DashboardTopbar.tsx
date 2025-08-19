import { useState } from "react";
import { Search, Bell, ChevronDown, Building, Calendar, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function DashboardTopbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex items-center justify-between h-full">
        {/* Lado izquierdo - Selector de empresa y búsqueda */}
        <div className="flex items-center gap-4 flex-1">
          {/* Selector de empresa */}
          <Select defaultValue="empresa1">
            <SelectTrigger className="w-56 bg-background border-border">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empresa1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>TechCorp S.L.</span>
                </div>
              </SelectItem>
              <SelectItem value="empresa2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Consultoría Global</span>
                </div>
              </SelectItem>
              <SelectItem value="empresa3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Marketing Plus</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar facturas, gastos, clientes..."
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        {/* Lado derecho - Controles y usuario */}
        <div className="flex items-center gap-3">
          {/* Selector de fecha */}
          <Select defaultValue="30days">
            <SelectTrigger className="w-32 bg-background border-border">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="7days">7 días</SelectItem>
              <SelectItem value="30days">30 días</SelectItem>
              <SelectItem value="thismonth">Este mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          {/* Modo oscuro */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-9 h-9"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Notificaciones */}
          <Button variant="ghost" size="icon" className="relative w-9 h-9">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-destructive">
              3
            </Badge>
          </Button>

          {/* Menú de usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-3 py-2 h-auto">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">Juan Pérez</p>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Ayuda</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
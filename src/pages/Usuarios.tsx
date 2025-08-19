import { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, Trash2, UserPlus, Shield, ShieldCheck, Crown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const usuarios = [
  {
    id: "USR-001",
    nombre: "Carlos Martínez",
    email: "carlos@techcorp.com",
    rol: "owner",
    estado: "activo",
    ultimoAcceso: "Hace 2 horas",
    fechaInvitacion: "01/01/2024",
    permisos: ["dashboard", "ingresos", "gastos", "clientes", "usuarios", "ajustes"]
  },
  {
    id: "USR-002",
    nombre: "Ana González",
    email: "ana@techcorp.com", 
    rol: "manager",
    estado: "activo",
    ultimoAcceso: "Hace 1 día",
    fechaInvitacion: "05/01/2024",
    permisos: ["dashboard", "ingresos", "gastos", "clientes"]
  },
  {
    id: "USR-003",
    nombre: "Luis Rodríguez",
    email: "luis@techcorp.com",
    rol: "accountant",
    estado: "activo", 
    ultimoAcceso: "Hace 3 horas",
    fechaInvitacion: "10/01/2024",
    permisos: ["dashboard", "ingresos", "gastos"]
  },
  {
    id: "USR-004",
    nombre: "María López",
    email: "maria@techcorp.com",
    rol: "accountant",
    estado: "pendiente",
    ultimoAcceso: "Nunca",
    fechaInvitacion: "15/01/2024",
    permisos: ["dashboard", "ingresos", "gastos"]
  }
];

const roles = [
  { id: "owner", label: "Propietario", color: "primary", icon: Crown, descripcion: "Acceso completo a todo el sistema" },
  { id: "manager", label: "Gerente", color: "success", icon: ShieldCheck, descripcion: "Gestión de clientes y finanzas" },
  { id: "accountant", label: "Contable", color: "warning", icon: Shield, descripcion: "Solo ingresos y gastos" }
];

const getRoleBadge = (rol: string) => {
  const roleInfo = roles.find(r => r.id === rol);
  if (!roleInfo) return <Badge variant="secondary">{rol}</Badge>;
  
  const IconComponent = roleInfo.icon;
  
  switch (rol) {
    case "owner":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
          <IconComponent className="w-3 h-3" />
          {roleInfo.label}
        </Badge>
      );
    case "manager":
      return (
        <Badge className="bg-success/10 text-success border-success/20 gap-1">
          <IconComponent className="w-3 h-3" />
          {roleInfo.label}
        </Badge>
      );
    case "accountant":
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
          <IconComponent className="w-3 h-3" />
          {roleInfo.label}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{rol}</Badge>;
  }
};

const getStatusBadge = (estado: string) => {
  switch (estado) {
    case "activo":
      return <Badge className="bg-success/10 text-success border-success/20">Activo</Badge>;
    case "pendiente":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pendiente</Badge>;
    case "inactivo":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Inactivo</Badge>;
    default:
      return <Badge variant="secondary">{estado}</Badge>;
  }
};

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "todos" || usuario.rol === roleFilter;
    const matchesStatus = statusFilter === "todos" || usuario.estado === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const InviteUserDialog = () => (
    <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invitar Usuario</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email del usuario *</Label>
            <Input id="email" type="email" placeholder="usuario@empresa.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((rol) => (
                  <SelectItem key={rol.id} value={rol.id}>
                    <div className="flex items-center gap-2">
                      <rol.icon className="w-4 h-4" />
                      <div>
                        <p className="font-medium">{rol.label}</p>
                        <p className="text-xs text-muted-foreground">{rol.descripcion}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Se enviará un email de invitación al usuario con las instrucciones para acceder.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsInviteOpen(false)}>
            <Mail className="w-4 h-4 mr-2" />
            Enviar Invitación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios y permisos de tu empresa
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-primary hover:bg-primary-hover"
          onClick={() => setIsInviteOpen(true)}
        >
          <UserPlus className="w-4 h-4" />
          Invitar Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl font-bold text-primary">4</p>
              </div>
              <Crown className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Activos</p>
                <p className="text-2xl font-bold text-success">3</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Invitaciones Pendientes</p>
                <p className="text-2xl font-bold text-warning">1</p>
              </div>
              <Mail className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Roles Definidos</p>
                <p className="text-2xl font-bold text-secondary-foreground">3</p>
              </div>
              <Shield className="w-8 h-8 text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los roles</SelectItem>
                <SelectItem value="owner">Propietarios</SelectItem>
                <SelectItem value="manager">Gerentes</SelectItem>
                <SelectItem value="accountant">Contables</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead>Fecha Invitación</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios.map((usuario) => (
                <TableRow key={usuario.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {usuario.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{usuario.nombre}</p>
                        <p className="text-sm text-muted-foreground">{usuario.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(usuario.rol)}</TableCell>
                  <TableCell>{getStatusBadge(usuario.estado)}</TableCell>
                  <TableCell className="text-muted-foreground">{usuario.ultimoAcceso}</TableCell>
                  <TableCell className="text-muted-foreground">{usuario.fechaInvitacion}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Cambiar rol
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Reenviar invitación
                        </DropdownMenuItem>
                        {usuario.estado === "activo" && (
                          <DropdownMenuItem>
                            <Switch className="w-4 h-4 mr-2" />
                            Desactivar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <InviteUserDialog />
    </div>
  );
}
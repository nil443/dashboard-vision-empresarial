import { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, MapPin, Calendar, Euro, FileText, User, ArrowRight } from "lucide-react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const clientes = [
  {
    id: "CLI-001",
    nombre: "Empresa ABC S.L.",
    contacto: "Juan Pérez",
    email: "juan.perez@empresa-abc.com",
    telefono: "+34 912 345 678",
    direccion: "Calle Principal, 123, Madrid",
    fechaRegistro: "15/01/2024",
    totalFacturado: "12.500,00 €",
    facturasPendientes: 0,
    ultimaFactura: "15/01/2024",
    fase: "pagado",
    notas: "Cliente muy puntual en los pagos"
  },
  {
    id: "CLI-002", 
    nombre: "StartupXYZ",
    contacto: "María González",
    email: "maria@startupxyz.com",
    telefono: "+34 654 321 987",
    direccion: "Av. Innovación, 456, Barcelona",
    fechaRegistro: "13/01/2024",
    totalFacturado: "4.800,00 €",
    facturasPendientes: 1,
    ultimaFactura: "13/01/2024",
    fase: "no_pagado",
    notas: "Startup en crecimiento, buena comunicación"
  },
  {
    id: "CLI-003",
    nombre: "TechCorp Ltd.",
    contacto: "Robert Smith",
    email: "r.smith@techcorp.com",
    telefono: "+34 987 654 321",
    direccion: "Tech Park, Building 1, Valencia",
    fechaRegistro: "11/01/2024", 
    totalFacturado: "8.900,00 €",
    facturasPendientes: 1,
    ultimaFactura: "11/01/2024",
    fase: "mantenimiento",
    notas: "Cliente en contrato de mantenimiento mensual"
  },
  {
    id: "CLI-004",
    nombre: "Consultoría Global",
    contacto: "Ana López",
    email: "ana.lopez@consultoria.com",
    telefono: "+34 611 222 333",
    direccion: "Plaza Central, 789, Sevilla",
    fechaRegistro: "08/01/2024",
    totalFacturado: "1.500,00 €",
    facturasPendientes: 0,
    ultimaFactura: "08/01/2024",
    fase: "rechazado",
    notas: "Rechazó la última propuesta comercial"
  }
];

const fases = [
  { id: "no_pagado", label: "Aún no ha pagado", color: "warning", count: 1 },
  { id: "pagado", label: "Ha pagado", color: "success", count: 1 },
  { id: "mantenimiento", label: "En mantenimiento", color: "primary", count: 1 },
  { id: "rechazado", label: "Ha rechazado", color: "destructive", count: 1 }
];

const getStatusBadge = (fase: string) => {
  switch (fase) {
    case "pagado":
      return <Badge className="bg-success/10 text-success border-success/20">Ha pagado</Badge>;
    case "no_pagado":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Aún no ha pagado</Badge>;
    case "mantenimiento":
      return <Badge className="bg-primary/10 text-primary border-primary/20">En mantenimiento</Badge>;
    case "rechazado":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Ha rechazado</Badge>;
    default:
      return <Badge variant="secondary">{fase}</Badge>;
  }
};

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [faseFilter, setFaseFilter] = useState("todos");
  const [activeTab, setActiveTab] = useState("todos");
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFase = faseFilter === "todos" || cliente.fase === faseFilter;
    const matchesTab = activeTab === "todos" || cliente.fase === activeTab;
    return matchesSearch && matchesFase && matchesTab;
  });

  const NewClientDialog = () => (
    <Dialog open={isNewClientOpen} onOpenChange={setIsNewClientOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nuevo Cliente</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la empresa *</Label>
            <Input id="nombre" placeholder="Ej: Empresa ABC S.L." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contacto">Persona de contacto *</Label>
            <Input id="contacto" placeholder="Ej: Juan Pérez" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="contacto@empresa.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" placeholder="+34 912 345 678" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" placeholder="Calle Principal, 123, Madrid" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="notas">Notas</Label>
            <Textarea id="notas" placeholder="Información adicional sobre el cliente..." />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsNewClientOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsNewClientOpen(false)}>
            Crear Cliente
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
          <h1 className="text-3xl font-bold tracking-tight">CRM - Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona tus clientes organizados por fases del proceso comercial
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-primary hover:bg-primary-hover"
          onClick={() => setIsNewClientOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {fases.map((fase) => (
          <Card key={fase.id} className={`bg-gradient-to-br from-${fase.color}/5 to-${fase.color}/10 border-${fase.color}/20`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{fase.label}</p>
                  <p className={`text-2xl font-bold text-${fase.color}`}>{fase.count}</p>
                </div>
                <User className={`w-8 h-8 text-${fase.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs y Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="no_pagado">Aún no han pagado</TabsTrigger>
              <TabsTrigger value="pagado">Han pagado</TabsTrigger>
              <TabsTrigger value="mantenimiento">En mantenimiento</TabsTrigger>
              <TabsTrigger value="rechazado">Han rechazado</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, contacto o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={faseFilter} onValueChange={setFaseFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las fases</SelectItem>
                  <SelectItem value="no_pagado">Aún no han pagado</SelectItem>
                  <SelectItem value="pagado">Han pagado</SelectItem>
                  <SelectItem value="mantenimiento">En mantenimiento</SelectItem>
                  <SelectItem value="rechazado">Han rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Fase</TableHead>
                    <TableHead>Total Facturado</TableHead>
                    <TableHead>Pendientes</TableHead>
                    <TableHead>Última Factura</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium">{cliente.nombre}</p>
                          <p className="text-sm text-muted-foreground">{cliente.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{cliente.contacto}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{cliente.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{cliente.telefono}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(cliente.fase)}</TableCell>
                      <TableCell className="font-medium">{cliente.totalFacturado}</TableCell>
                      <TableCell>
                        {cliente.facturasPendientes > 0 ? (
                          <Badge variant="destructive">{cliente.facturasPendientes}</Badge>
                        ) : (
                          <Badge variant="secondary">0</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{cliente.ultimaFactura}</TableCell>
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
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              Ver facturas
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Cambiar fase
                            </DropdownMenuItem>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <NewClientDialog />
    </div>
  );
}
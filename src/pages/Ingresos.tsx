import { useState } from "react";
import { Plus, Search, Filter, FileText, Eye, Edit, Trash2, Download } from "lucide-react";
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

const facturas = [
  {
    id: "FAC-2024-001",
    numero: "2024-001",
    cliente: "Empresa ABC S.L.",
    descripcion: "Servicios de consultoría tecnológica",
    fecha: "15/01/2024",
    vencimiento: "15/02/2024",
    baseImponible: "2.066,12 €",
    iva: "433,89 €",
    total: "2.500,00 €",
    estado: "pagada"
  },
  {
    id: "FAC-2024-002",
    numero: "2024-002",
    cliente: "StartupXYZ",
    descripcion: "Desarrollo aplicación web completa",
    fecha: "13/01/2024",
    vencimiento: "13/03/2024",
    baseImponible: "3.966,94 €",
    iva: "833,06 €",
    total: "4.800,00 €",
    estado: "pagada"
  },
  {
    id: "FAC-2024-003",
    numero: "2024-003",
    cliente: "TechCorp Ltd.",
    descripcion: "Mantenimiento y soporte sistema",
    fecha: "11/01/2024",
    vencimiento: "11/02/2024",
    baseImponible: "735,54 €",
    iva: "154,46 €",
    total: "890,00 €",
    estado: "pendiente"
  },
  {
    id: "FAC-2024-004",
    numero: "2024-004",
    cliente: "Consultoría Global",
    descripcion: "Auditoría de seguridad informática",
    fecha: "08/01/2024",
    vencimiento: "08/01/2024",
    baseImponible: "1.239,67 €",
    iva: "260,33 €",
    total: "1.500,00 €",
    estado: "vencida"
  },
  {
    id: "FAC-2024-005",
    numero: "2024-005",
    cliente: "Marketing Plus S.A.",
    descripcion: "Integración CRM personalizada",
    fecha: "05/01/2024",
    vencimiento: "05/02/2024",
    baseImponible: "2.975,21 €",
    iva: "624,79 €",
    total: "3.600,00 €",
    estado: "pendiente"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pagada":
      return <Badge className="bg-success/10 text-success border-success/20">Pagada</Badge>;
    case "pendiente":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pendiente</Badge>;
    case "vencida":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Vencida</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Ingresos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredFacturas = facturas.filter(factura => {
    const matchesSearch = factura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factura.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || factura.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ingresos</h1>
          <p className="text-muted-foreground">
            Gestiona las facturas y ingresos de tu empresa
          </p>
        </div>
        <Button className="gap-2 bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4" />
          Nueva Factura
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Facturado</p>
                <p className="text-2xl font-bold text-success">13.290,00 €</p>
              </div>
              <FileText className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Facturas Pagadas</p>
                <p className="text-2xl font-bold text-primary">2</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-warning">2</p>
              </div>
              <FileText className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vencidas</p>
                <p className="text-2xl font-bold text-destructive">1</p>
              </div>
              <FileText className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Facturas de Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, número de factura o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pagada">Pagadas</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="vencida">Vencidas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacturas.map((factura) => (
                <TableRow key={factura.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-sm font-medium">
                    {factura.numero}
                  </TableCell>
                  <TableCell className="font-medium">{factura.cliente}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate" title={factura.descripcion}>
                      {factura.descripcion}
                    </p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{factura.fecha}</TableCell>
                  <TableCell className="text-muted-foreground">{factura.vencimiento}</TableCell>
                  <TableCell className="font-medium">{factura.total}</TableCell>
                  <TableCell>{getStatusBadge(factura.estado)}</TableCell>
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
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
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
        </CardContent>
      </Card>
    </div>
  );
}